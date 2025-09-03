import streamlit as st
import numpy as np
import pandas as pd
import plotly.graph_objects as go
from datetime import datetime, timedelta
import random
import json
import os
from utils.navigation import create_breadcrumb
from utils.budget_data_manager import BudgetDataManager
from utils.tax_data_manager import TaxDataManager
from utils.investment_data_manager import InvestmentDataManager
from utils.data_persistence import load_data, save_data

# Function to save journey data when it changes
def save_journey_data():
    try:
        save_data("financial_journey", st.session_state.journey_data)
    except Exception as e:
        st.warning(f"Could not save journey data: {str(e)}")
        
def calculate_phase_metrics(budget_manager, tax_manager, investment_manager):
    """
    Calculate metrics for each financial phase to determine progress
    Returns a dictionary with phase names as keys and completion percentages as values
    """
    metrics = {
        "Learning": 0.0,  
        "Stabilizing": 0.0,
        "Growing": 0.0,
        "Optimizing": 0.0,
        "Freedom": 0.0
    }
    
    try:
        # Get data from various managers
        budget_data_list = budget_manager.load_budget_data()
        
        # Get the latest budget entry if the list is not empty
        if budget_data_list and isinstance(budget_data_list, list) and len(budget_data_list) > 0:
            latest_budget_data = budget_data_list[-1]  # Get most recent entry
            budget_data = latest_budget_data  # For single-entry access
        else:
            budget_data = {}  # Empty dict if no budget data exists
        
        # Get investment data
        try:
            investment_data = investment_manager.load_investment_data()
            if not investment_data:
                investment_data = {}
        except Exception:
            investment_data = {}
            
        # Get tax data
        try:
            tax_data = tax_manager.load_tax_calculations()
            if not tax_data:
                tax_data = {}
        except Exception:
            tax_data = {}
            
        # Get risk assessment data
        try:
            risk_data = investment_manager.get_risk_assessment()
            if not risk_data:
                risk_data = {}
        except Exception:
            risk_data = {}
            
        # Get debt data
        try:
            debt_data = budget_manager.get_debt_data()
            if not debt_data:
                debt_data = {}
        except Exception:
            debt_data = {}
            
        # Get emergency fund data
        try:
            emergency_fund = budget_manager.get_emergency_fund()
            if not emergency_fund:
                emergency_fund = 0
        except Exception:
            emergency_fund = 0
        
        # Load goal settings data
        goal_data = load_data("goal_settings") or {}
        goals = goal_data.get('goals', [])
        
        # Get achievements
        achievements = st.session_state.journey_data.get('achievements', [])
        
        # LEARNING PHASE METRICS (out of 100%)
        learning_metrics = 0
        
        # Check if budget has been set up
        if budget_data and isinstance(budget_data, dict) and budget_data:
            learning_metrics += 25
        
        # Check if at least 30 days of expense tracking
        if budget_data_list and isinstance(budget_data_list, list) and len(budget_data_list) >= 30:
            learning_metrics += 25
        
        # Check if user has completed risk assessment
        if risk_data and risk_data.get('completed', False):
            learning_metrics += 25
        
        # Check if at least one financial goal has been set
        if goals and len(goals) > 0:
            learning_metrics += 25
            
        metrics["Learning"] = min(100.0, learning_metrics)
            
        # STABILIZING PHASE METRICS (out of 100%)
        stabilizing_metrics = 0
        
        # Check emergency fund (0-50% based on progress to 6 months of expenses)
        if emergency_fund:
            months_coverage = emergency_fund.get('months_coverage', 0)
            target_months = 6  # Aim for 6 months of expenses
            stabilizing_metrics += min(50, (months_coverage / target_months) * 50)
        
        # Check debt reduction (0-30% based on high-interest debt reduction)
        if debt_data:
            initial_debt = debt_data.get('initial_high_interest_debt', 0)
            current_debt = debt_data.get('current_high_interest_debt', initial_debt)
            
            if initial_debt > 0:
                debt_reduction_pct = max(0, (initial_debt - current_debt) / initial_debt)
                stabilizing_metrics += min(30, debt_reduction_pct * 30)
        
        # Check budget adherence for 3 consecutive months (20%)
        if budget_data and budget_data.get('adherence_months', 0) >= 3:
            stabilizing_metrics += 20
            
        metrics["Stabilizing"] = min(100.0, stabilizing_metrics)
        
        # GROWING PHASE METRICS (out of 100%)
        growing_metrics = 0
        
        # Check investment progress (40%)
        if investment_data:
            # Check if tax-advantaged investments are maximized (20%)
            if investment_data.get('tax_advantaged_maximized', False):
                growing_metrics += 20
                
            # Check if diversified investment plan exists (20%)
            if investment_data.get('diversified_plan', False):
                growing_metrics += 20
        
        # Check savings rate (40%)
        if budget_data and isinstance(budget_data, dict):
            # Use budget_data directly since we already have the latest entry
            savings_rate = budget_data.get('savings_rate', 0)
            if savings_rate >= 20:  # Aim for 20% savings rate
                growing_metrics += 40
            elif savings_rate > 0:
                growing_metrics += (savings_rate / 20) * 40
        
        # Check risk assessment completion (20%)
        if risk_data and risk_data.get('advanced_completed', False):
            growing_metrics += 20
            
        metrics["Growing"] = min(100.0, growing_metrics)
        
        # OPTIMIZING PHASE METRICS (out of 100%)
        optimizing_metrics = 0
        
        # Check portfolio size (30%)
        if investment_data:
            portfolio_value = investment_data.get('portfolio_value', 0)
            target_value = 1000000  # 10 Lakhs
            if portfolio_value >= target_value:
                optimizing_metrics += 30
            elif portfolio_value > 0:
                optimizing_metrics += (portfolio_value / target_value) * 30
        
        # Check multiple income streams (30%)
        if budget_data and isinstance(budget_data, dict):
            income_streams = budget_data.get('income_streams', 1)
            if income_streams >= 3:
                optimizing_metrics += 30
            elif income_streams > 1:
                optimizing_metrics += ((income_streams - 1) / 2) * 30
        
        # Check debt-to-income ratio (20%)
        if budget_data and isinstance(budget_data, dict) and debt_data:
            monthly_income = budget_data.get('monthly_income', 0)
            debt_payments = debt_data.get('monthly_payments', 0)
            
            if monthly_income > 0:
                dti_ratio = (debt_payments / monthly_income) * 100
                if dti_ratio <= 20:
                    optimizing_metrics += 20
                elif dti_ratio < 36:  # Standard financial health threshold
                    optimizing_metrics += (36 - dti_ratio) / (36 - 20) * 20
        
        # Check insurance and estate planning (20%)
        if investment_data and investment_data.get('estate_planning_complete', False):
            optimizing_metrics += 20
            
        metrics["Optimizing"] = min(100.0, optimizing_metrics)
        
        # FREEDOM PHASE METRICS (out of 100%)
        freedom_metrics = 0
        
        # Check passive income ratio (50%)
        if budget_data and isinstance(budget_data, dict):
            monthly_expenses = budget_data.get('total_expenses', 0)
            passive_income = budget_data.get('passive_income', 0)
            
            if monthly_expenses > 0:
                passive_ratio = passive_income / monthly_expenses
                if passive_ratio >= 1:  # Passive income covers expenses
                    freedom_metrics += 50
                elif passive_ratio > 0:
                    freedom_metrics += passive_ratio * 50
        
        # Check investment portfolio (30%)
        if investment_data:
            portfolio_value = investment_data.get('portfolio_value', 0)
            target_value = 5000000  # 50 Lakhs for financial freedom
            if portfolio_value >= target_value:
                freedom_metrics += 30
            elif portfolio_value > 0:
                freedom_metrics += (portfolio_value / target_value) * 30
        
        # Estate planning and legacy goals (20%)
        if investment_data:
            if investment_data.get('estate_planning_complete', False):
                freedom_metrics += 10
            
            if investment_data.get('legacy_planning_complete', False):
                freedom_metrics += 10
        
        metrics["Freedom"] = min(100.0, freedom_metrics)
        
    except Exception as e:
        st.warning(f"Error calculating phase metrics: {str(e)}")
        # Default to existing values or zero in case of error
        # Set default metrics to give a basic experience
        metrics["Learning"] = 25.0  # Default starting point
    
    return metrics

def determine_phase(phase_metrics):
    """
    Determine which phase the user should be in based on metrics
    Returns the phase name and completion percentage
    """
    # Phase advancement thresholds (need to reach this % to advance)
    thresholds = {
        "Learning": 80.0,
        "Stabilizing": 75.0,
        "Growing": 70.0,
        "Optimizing": 70.0,
        "Freedom": 60.0
    }
    
    # Start with Learning phase and advance as appropriate
    current_phase = "Learning"
    completion = phase_metrics["Learning"]
    
    # Check if we can advance to Stabilizing
    if phase_metrics["Learning"] >= thresholds["Learning"]:
        current_phase = "Stabilizing"
        completion = phase_metrics["Stabilizing"]
        
        # Check if we can advance to Growing
        if phase_metrics["Stabilizing"] >= thresholds["Stabilizing"]:
            current_phase = "Growing"
            completion = phase_metrics["Growing"]
            
            # Check if we can advance to Optimizing
            if phase_metrics["Growing"] >= thresholds["Growing"]:
                current_phase = "Optimizing"
                completion = phase_metrics["Optimizing"]
                
                # Check if we can advance to Freedom
                if phase_metrics["Optimizing"] >= thresholds["Optimizing"]:
                    current_phase = "Freedom"
                    completion = phase_metrics["Freedom"]
    
    return current_phase, completion

def show():
    """Display the Personalized Financial Journey Storyboard"""
    
    # Set page title and breadcrumb
    st.title("🚀 Your Financial Journey")
    create_breadcrumb("Financial Journey")
    
    # Initialize data managers for connected features
    budget_manager = BudgetDataManager()
    tax_manager = TaxDataManager()
    investment_manager = InvestmentDataManager()
    
    # Add disclaimer at the top
    st.info("**Disclaimer:** Past performance does not guarantee future returns. This storyboard represents a personalized visualization based on your information and is for educational purposes only.")
    
    # Initialize session state for user journey data
    if 'journey_data' not in st.session_state:
        # Try to load saved journey data first
        try:
            saved_journey_data = load_data("financial_journey")
            if saved_journey_data:
                st.session_state.journey_data = saved_journey_data
            else:
                st.session_state.journey_data = {
                    'milestones': [],
                    'goals': [],
                    'started_date': datetime.now().strftime("%Y-%m-%d"),
                    'current_phase': 'Learning',
                    'achievements': []
                }
        except Exception:
            # If there's an error loading, use default data
            st.session_state.journey_data = {
                'milestones': [],
                'goals': [],
                'started_date': datetime.now().strftime("%Y-%m-%d"),
                'current_phase': 'Learning',
                'achievements': []
            }
    
    # Save the data at the beginning (in case previous session didn't save properly)
    save_journey_data()
    
    # Main tabs
    tabs = st.tabs(["Your Journey Map", "Milestones", "Timeline", "Future Projection"])
    
    # Tab 1: Journey Map
    with tabs[0]:
        show_journey_map()
    
    # Tab 2: Milestones
    with tabs[1]:
        show_milestones()
    
    # Tab 3: Timeline
    with tabs[2]:
        show_timeline()
    
    # Tab 4: Future Projection
    with tabs[3]:
        show_future_projection()

def show_journey_map():
    """Display the visual journey map"""
    st.header("Your Financial Journey Map")
    
    # Initialize data managers for connected features
    budget_manager = BudgetDataManager()
    tax_manager = TaxDataManager()
    investment_manager = InvestmentDataManager()
    
    # Journey phases
    journey_phases = [
        {
            "name": "Learning",
            "description": "Building financial knowledge and awareness",
            "icon": "📚",
            "color": "#FF9E80"
        },
        {
            "name": "Stabilizing",
            "description": "Managing debt and building emergency fund",
            "icon": "🛡️",
            "color": "#FFD180"
        },
        {
            "name": "Growing",
            "description": "Active saving and beginning investments",
            "icon": "🌱",
            "color": "#FFFF8D"
        },
        {
            "name": "Optimizing",
            "description": "Diversified investments and tax optimization",
            "icon": "📈",
            "color": "#CCFF90"
        },
        {
            "name": "Freedom",
            "description": "Financial independence and wealth preservation",
            "icon": "🦅",
            "color": "#A7FFEB"
        }
    ]
    
    # Calculate current phase metrics
    phase_metrics = calculate_phase_metrics(budget_manager, tax_manager, investment_manager)
    
    # Get recommended phase based on metrics
    recommended_phase, completion_pct = determine_phase(phase_metrics)
    
    # Determine user's current phase (stored in session)
    current_phase = st.session_state.journey_data['current_phase']
    current_phase_index = next((i for i, phase in enumerate(journey_phases) if phase["name"] == current_phase), 0)
    
    # If recommended phase is different from current phase, show a suggestion
    recommended_phase_index = next((i for i, phase in enumerate(journey_phases) if phase["name"] == recommended_phase), 0)
    if recommended_phase_index > current_phase_index:
        st.success(f"🎉 Based on your financial progress, you've reached the criteria to advance to the {recommended_phase} phase!")
    
    # Show metric details in an expander
    with st.expander("View Detailed Phase Metrics"):
        st.write("Your progress in each financial phase:")
        for phase, score in phase_metrics.items():
            st.metric(
                f"{phase} Phase", 
                f"{score:.1f}%",
                help=f"You need {phase_metrics.get(phase, 0):.1f}% to complete this phase"
            )
            st.progress(score/100)
    
    # Create journey map visual
    st.write("### Where are you in your financial journey?")
    
    # Create a progress meter for the journey phases
    cols = st.columns(len(journey_phases))
    for i, phase in enumerate(journey_phases):
        with cols[i]:
            if i < current_phase_index:
                # Completed phase
                st.markdown(f"""
                <div style="text-align: center; background-color: rgba(0,255,0,0.1); padding: 10px; border-radius: 5px; height: 100%; position: relative;">
                    <div style="font-size: 24px;">{phase["icon"]}</div>
                    <div style="font-weight: bold;">{phase["name"]}</div>
                    <div style="font-size: 12px; margin-top: 5px;">Completed</div>
                    <div style="position: absolute; bottom: 5px; width: 100%; text-align: center; left: 0;">
                        <div style="color: green; font-size: 20px;">✓</div>
                    </div>
                </div>
                """, unsafe_allow_html=True)
            elif i == current_phase_index:
                # Current phase with actual completion percentage
                completion_pct = phase_metrics[current_phase]
                st.markdown(f"""
                <div style="text-align: center; background-color: rgba(255,165,0,0.2); padding: 10px; border-radius: 5px; border: 2px solid #FF9E00; height: 100%;">
                    <div style="font-size: 24px;">{phase["icon"]}</div>
                    <div style="font-weight: bold;">{phase["name"]}</div>
                    <div style="font-size: 12px; margin-top: 5px;">You are here</div>
                    <div style="margin-top: 5px;">
                        <div style="height: 5px; background-color: #e0e0e0; border-radius: 5px;">
                            <div style="height: 100%; width: {min(100, completion_pct)}%; background-color: #FF9E00; border-radius: 5px;"></div>
                        </div>
                    </div>
                    <div style="font-size: 10px; margin-top: 3px;">{completion_pct:.1f}% complete</div>
                </div>
                """, unsafe_allow_html=True)
            else:
                # Future phase
                st.markdown(f"""
                <div style="text-align: center; background-color: rgba(200,200,200,0.1); padding: 10px; border-radius: 5px; height: 100%;">
                    <div style="font-size: 24px;">{phase["icon"]}</div>
                    <div style="font-weight: bold;">{phase["name"]}</div>
                    <div style="font-size: 12px; margin-top: 5px; color: #888;">Upcoming</div>
                </div>
                """, unsafe_allow_html=True)
    
    # Show current phase details
    current_phase_data = journey_phases[current_phase_index]
    st.write(f"### Current Phase: {current_phase_data['name']} {current_phase_data['icon']}")
    
    st.markdown(f"""
    <div style="background-color: rgba(255,165,0,0.1); padding: 15px; border-radius: 10px; margin-bottom: 20px;">
        <p style="margin-bottom: 10px;"><strong>Description:</strong> {current_phase_data['description']}</p>
        <p><strong>Focus areas:</strong></p>
    </div>
    """, unsafe_allow_html=True)
    
    # Show focus areas for current phase
    focus_areas = {
        "Learning": [
            "📚 Financial education through our [Learning Hub](/Learning_Hub)",
            "📊 Tracking all income and expenses",
            "🧠 Building mindful money habits",
            "🔄 Identifying spending patterns"
        ],
        "Stabilizing": [
            "💵 Building emergency fund (3-6 months expenses)",
            "💳 Eliminating high-interest debt",
            "📝 Creating a sustainable budget",
            "🔐 Setting up basic insurance coverage"
        ],
        "Growing": [
            "💰 Maximizing retirement contributions",
            "🏦 Starting systematic investment plans",
            "🧮 Tax planning and optimization",
            "🎯 Setting medium-term financial goals"
        ],
        "Optimizing": [
            "📈 Diversifying investment portfolio",
            "🏠 Considering real estate investments",
            "🧩 Advanced tax optimization strategies",
            "💼 Career growth and income expansion"
        ],
        "Freedom": [
            "🏝️ Planning for financial independence",
            "🔄 Creating passive income streams",
            "🎁 Estate planning and wealth transfer",
            "💝 Charitable giving and legacy planning"
        ]
    }
    
    for focus in focus_areas[current_phase]:
        st.markdown(f"- {focus}")
    
    # Phase transition section
    st.write("### Ready to advance to the next phase?")
    
    if current_phase_index < len(journey_phases) - 1:
        next_phase = journey_phases[current_phase_index + 1]
        
        st.markdown(f"""
        To advance to the **{next_phase["name"]} {next_phase["icon"]}** phase, you'll need to complete these requirements:
        """)
        
        # Requirements to advance phases
        phase_requirements = {
            "Learning": [
                "✅ Complete Budget Setup in Budget Buddy",
                "✅ Track expenses for at least 30 days",
                "✅ Complete the Financial Wellness introduction",
                "⬜ Complete at least 3 videos in the [Learning Hub](/Learning_Hub)",
                "⬜ Set up your first financial goal"
            ],
            "Stabilizing": [
                "✅ Build emergency fund to cover 3 months expenses",
                "✅ Reduce high-interest debt by 50% or more",
                "⬜ Maintain budget adherence for 3 consecutive months",
                "⬜ Set up basic insurance coverage"
            ],
            "Growing": [
                "⬜ Max out tax-advantaged investments",
                "⬜ Create and follow a diversified investment plan",
                "⬜ Save 20% or more of monthly income for 6 months",
                "⬜ Complete advanced risk assessment"
            ],
            "Optimizing": [
                "⬜ Investment portfolio exceeding ₹10 Lakhs",
                "⬜ Multiple income streams established",
                "⬜ Debt-to-income ratio below 20%",
                "⬜ Comprehensive insurance and estate planning"
            ]
        }
        
        if current_phase in phase_requirements:
            for req in phase_requirements[current_phase]:
                st.markdown(f"- {req}")
            
            # Show actual completion percentage from metrics
            completion_pct = phase_metrics[current_phase]
            threshold_pct = phase_metrics.get(current_phase, 0)
            
            # Display completion progress
            st.progress(completion_pct/100, f"Phase Completion: {completion_pct:.1f}%")
            
            # Show auto-advancement option if metrics suggest it's possible
            if completion_pct >= 80:
                st.success(f"🎉 You've completed {completion_pct:.1f}% of the {current_phase} phase requirements!")
                
                # Option for automatic advancement
                auto_advance = st.checkbox("Enable automatic phase advancement", value=True, 
                                          help="When enabled, RupeeSmart will automatically advance you to the next phase when you meet the criteria")
                
                if auto_advance and recommended_phase_index > current_phase_index:
                    st.info(f"Based on your data, you qualify for automatic advancement to the {recommended_phase} phase.")
            
            # Initialize auto_advance flag
            auto_advance = False
            
            # Manual advancement option
            col1, col2 = st.columns([2, 1])
            with col1:
                advancement_btn = st.button(f"Advance to {next_phase['name']} Phase", 
                                         type="primary",
                                         help="You can manually advance to the next phase anytime")
                
            with col2:
                if threshold_pct < 75:
                    st.warning(f"Recommended: Complete at least 75% of current phase")
            
            # Process phase advancement (both manual and automatic)
            auto_advance_triggered = ('auto_advance' in locals()) and auto_advance and (recommended_phase_index > current_phase_index)
            
            if advancement_btn or auto_advance_triggered:
                # Calculate which phase to advance to 
                new_phase = recommended_phase if auto_advance_triggered else next_phase['name']
                
                # Update session state
                st.session_state.journey_data['current_phase'] = new_phase
                st.session_state.journey_data['achievements'].append({
                    'date': datetime.now().strftime("%Y-%m-%d"),
                    'description': f"Advanced to {new_phase} Phase! 🎉",
                    'type': 'phase_change'
                })
                
                # Save updated journey data
                save_journey_data()
                
                # Also add to goal settings
                try:
                    goal_data = load_data("goal_settings") or {}
                    if 'achievements' not in goal_data:
                        goal_data['achievements'] = []
                    
                    goal_data['achievements'].append({
                        'date': datetime.now().strftime("%Y-%m-%d"),
                        'description': f"Advanced to {new_phase} Phase of financial journey!",
                        'source': 'Financial Journey',
                        'completed': True
                    })
                    
                    save_data("goal_settings", goal_data)
                except Exception:
                    pass  # Silent fail if goal settings can't be updated
                
                trigger_type = "automatically" if auto_advance_triggered else "manually"
                st.success(f"Congratulations! You've {trigger_type} advanced to the {new_phase} phase of your financial journey!")
                st.rerun()
    else:
        st.success("Congratulations! You've reached the highest phase of your financial journey. Now focus on maintaining and optimizing your strategy!")

def show_milestones():
    """Display the financial milestones section"""
    st.header("Your Financial Milestones")
    
    # Create two columns for layout
    col1, col2 = st.columns([3, 2])
    
    with col1:
        st.write("### Key Achievements")
        
        # Add existing achievements
        if not st.session_state.journey_data['achievements']:
            st.info("You haven't recorded any achievements yet. Start by adding your first financial milestone!")
        else:
            for i, achievement in enumerate(sorted(st.session_state.journey_data['achievements'], key=lambda x: x['date'], reverse=True)):
                achievement_date = datetime.strptime(achievement['date'], "%Y-%m-%d").strftime("%d %b %Y")
                achievement_type = achievement.get('type', 'milestone')
                
                icon = "🏆"
                if achievement_type == 'phase_change':
                    icon = "🚀"
                elif achievement_type == 'goal_complete':
                    icon = "🎯"
                elif achievement_type == 'saving':
                    icon = "💰"
                
                st.markdown(f"""
                <div style="display: flex; margin-bottom: 10px; background-color: rgba(100,181,246,0.1); padding: 10px; border-radius: 5px;">
                    <div style="font-size: 24px; margin-right: 10px;">{icon}</div>
                    <div style="flex-grow: 1;">
                        <div style="font-weight: bold;">{achievement['description']}</div>
                        <div style="font-size: 12px; color: #888;">{achievement_date}</div>
                    </div>
                </div>
                """, unsafe_allow_html=True)
    
    with col2:
        st.write("### Add New Milestone")
        
        # Form to add new milestone
        with st.form("new_milestone_form"):
            milestone_date = st.date_input("Date", datetime.now())
            milestone_description = st.text_area("Milestone Description", placeholder="e.g., Paid off credit card debt")
            milestone_type = st.selectbox("Milestone Type", [
                "Financial Goal", 
                "Saving Achievement", 
                "Debt Reduction", 
                "Investment Success", 
                "Learning Hub Achievement", 
                "Learning Achievement", 
                "Other"
            ])
            
            # Map milestone type to icon type
            type_mapping = {
                "Financial Goal": "goal_complete",
                "Saving Achievement": "saving",
                "Debt Reduction": "debt",
                "Investment Success": "investment",
                "Learning Hub Achievement": "learning_hub",
                "Learning Achievement": "learning",
                "Other": "milestone"
            }
            
            submitted = st.form_submit_button("Add Milestone")
            
            share_with_goal_settings = st.checkbox("Share this milestone with Goal Settings", value=True)
            
            if submitted and milestone_description:
                # Add new milestone to journey data
                new_milestone = {
                    'date': milestone_date.strftime("%Y-%m-%d"),
                    'description': milestone_description,
                    'type': type_mapping.get(milestone_type, 'milestone')
                }
                
                st.session_state.journey_data['achievements'].append(new_milestone)
                
                # Save journey data
                save_journey_data()
                
                # Share with goal settings if selected
                if share_with_goal_settings:
                    try:
                        # Get current goal data
                        goal_data = load_data("goal_settings") or {}
                        
                        # Add milestone to goal achievements
                        if 'achievements' not in goal_data:
                            goal_data['achievements'] = []
                            
                        goal_data['achievements'].append({
                            'date': new_milestone['date'],
                            'description': new_milestone['description'],
                            'source': 'Financial Journey',
                            'completed': True
                        })
                        
                        # Save updated goal data
                        save_data("goal_settings", goal_data)
                        
                        st.success("Milestone added successfully and shared with Goal Settings!")
                    except Exception as e:
                        st.success("Milestone added successfully!")
                        st.warning(f"Could not share with Goal Settings: {str(e)}")
                else:
                    st.success("Milestone added successfully!")
                
                st.rerun()

def show_timeline():
    """Display the financial journey timeline"""
    st.header("Your Financial Timeline")
    
    # Generate timeline data
    events = []
    
    # Add first day of journey
    start_date = datetime.strptime(st.session_state.journey_data['started_date'], "%Y-%m-%d")
    events.append({
        'date': start_date,
        'description': "Started financial journey with RupeeSmart",
        'type': 'journey_start'
    })
    
    # Add all achievements
    for achievement in st.session_state.journey_data['achievements']:
        events.append({
            'date': datetime.strptime(achievement['date'], "%Y-%m-%d"),
            'description': achievement['description'],
            'type': achievement.get('type', 'milestone')
        })
    
    # Sort events chronologically
    events.sort(key=lambda x: x['date'])
    
    # Display timeline visually
    st.write("### Your Journey So Far")
    
    if len(events) <= 1:
        st.info("Your timeline will grow as you add more milestones to your journey!")
    
    for i, event in enumerate(events):
        event_date = event['date'].strftime("%d %b %Y")
        
        # Determine icon based on event type
        icon = "🔹"
        if event['type'] == 'journey_start':
            icon = "🚀"
        elif event['type'] == 'phase_change':
            icon = "⭐"
        elif event['type'] == 'goal_complete':
            icon = "🎯"
        elif event['type'] == 'saving':
            icon = "💰"
        elif event['type'] == 'debt':
            icon = "💳"
        elif event['type'] == 'investment':
            icon = "📈"
        elif event['type'] == 'learning_hub':
            icon = "🎓"
        elif event['type'] == 'learning':
            icon = "📚"
        
        # Calculate days since event
        days_ago = (datetime.now() - event['date']).days
        days_text = f"Today" if days_ago == 0 else f"{days_ago} days ago"
        
        # Create timeline entry
        st.markdown(f"""
        <div style="display: flex; margin-bottom: 5px;">
            <div style="font-size: 14px; color: #888; width: 100px;">{event_date}</div>
            <div style="border-left: 2px solid #ccc; padding-left: 15px; padding-bottom: 20px; position: relative;">
                <div style="position: absolute; left: -10px; top: 0; font-size: 18px;">{icon}</div>
                <div style="font-weight: bold;">{event['description']}</div>
                <div style="font-size: 12px; color: #888;">{days_text}</div>
            </div>
        </div>
        """, unsafe_allow_html=True)
    
    # Add future events option
    st.write("### Plan Future Milestones")
    
    with st.expander("Add a future milestone"):
        with st.form("future_milestone_form"):
            future_date = st.date_input("Expected Date", datetime.now() + timedelta(days=90))
            future_description = st.text_area("Goal Description", placeholder="e.g., Complete emergency fund")
            future_type = st.selectbox("Goal Type", [
                "Financial Goal", 
                "Saving Target", 
                "Debt Elimination", 
                "Investment Target", 
                "Learning Hub Completion", 
                "Learning Objective", 
                "Life Event"
            ])
            
            submitted = st.form_submit_button("Add to Timeline")
            
            if submitted and future_description:
                # Map goal type to appropriate type
                type_mapping = {
                    "Financial Goal": "goal_complete",
                    "Saving Target": "saving",
                    "Debt Elimination": "debt",
                    "Investment Target": "investment",
                    "Learning Hub Completion": "learning_hub",
                    "Learning Objective": "learning",
                    "Life Event": "milestone"
                }
                
                # Add future milestone
                st.session_state.journey_data['goals'].append({
                    'date': future_date.strftime("%Y-%m-%d"),
                    'description': future_description,
                    'type': type_mapping.get(future_type, 'milestone'),
                    'completed': False
                })
                
                # Save journey data
                save_journey_data()
                
                st.success("Future milestone added to your journey!")
                st.rerun()
    
    # Show planned future milestones
    if st.session_state.journey_data['goals']:
        st.write("### Your Planned Milestones")
        
        future_goals = sorted(st.session_state.journey_data['goals'], key=lambda x: datetime.strptime(x['date'], "%Y-%m-%d"))
        
        for i, goal in enumerate(future_goals):
            goal_date = datetime.strptime(goal['date'], "%Y-%m-%d").strftime("%d %b %Y")
            days_until = (datetime.strptime(goal['date'], "%Y-%m-%d") - datetime.now()).days
            
            # Determine icon based on goal type
            icon = "🔹"
            if goal['type'] == 'goal_complete':
                icon = "🎯"
            elif goal['type'] == 'saving':
                icon = "💰"
            elif goal['type'] == 'debt':
                icon = "💳"
            elif goal['type'] == 'investment':
                icon = "📈"
            elif goal['type'] == 'learning_hub':
                icon = "🎓"
            elif goal['type'] == 'learning':
                icon = "📚"
            
            status = "✅ Completed" if goal.get('completed', False) else f"⏰ {days_until} days remaining"
            
            # Create future milestone entry
            cols = st.columns([3, 1])
            with cols[0]:
                st.markdown(f"""
                <div style="display: flex; margin-bottom: 10px; background-color: rgba(200,200,200,0.1); padding: 10px; border-radius: 5px;">
                    <div style="font-size: 24px; margin-right: 10px;">{icon}</div>
                    <div style="flex-grow: 1;">
                        <div style="font-weight: bold;">{goal['description']}</div>
                        <div style="font-size: 12px;">Target: {goal_date}</div>
                        <div style="font-size: 12px; color: {'green' if goal.get('completed', False) else '#888'};">{status}</div>
                    </div>
                </div>
                """, unsafe_allow_html=True)
            
            with cols[1]:
                if not goal.get('completed', False):
                    if st.button("Mark Complete", key=f"complete_goal_{i}"):
                        # Mark goal as completed
                        st.session_state.journey_data['goals'][i]['completed'] = True
                        
                        # Add to achievements
                        st.session_state.journey_data['achievements'].append({
                            'date': datetime.now().strftime("%Y-%m-%d"),
                            'description': goal['description'] + " 🎉",
                            'type': goal['type']
                        })
                        
                        # Save journey data
                        save_journey_data()
                        
                        st.success("Milestone marked as completed and added to your achievements!")
                        st.rerun()
                else:
                    st.write("✅")

def show_future_projection():
    """Display future financial projections based on current progress"""
    st.header("Your Financial Future Projection")
    
    # Add disclaimer
    st.warning("**Important:** These projections are estimates based on current information and assumptions. Actual results may vary. Past performance does not guarantee future returns.")
    
    # Connect to budget data
    budget_manager = BudgetDataManager()
    budget_data = budget_manager.get_data() or {}
    
    # Get income and savings from Budget Buddy if available
    monthly_income = budget_data.get('income', 50000)  # Default value if not set
    savings_percentage = budget_data.get('savings_percentage', 20)  # Default value if not set
    monthly_savings = (monthly_income * savings_percentage / 100)
    
    # Get investment data if available
    investment_manager = InvestmentDataManager()
    investment_data = investment_manager.get_data() or {}
    current_investments = float(investment_data.get('total_investments', 100000))  # Default value if not set, ensure float
    
    # Initialize with connected data where available
    if 'projection_data' not in st.session_state:
        st.session_state.projection_data = {
            'current_savings': float(current_investments),
            'monthly_contribution': float(monthly_savings),
            'expected_return_conservative': 7.0,
            'expected_return_moderate': 10.0,
            'expected_return_aggressive': 13.0,
            'inflation_rate': 5.0,
            'time_horizon_years': 25
        }
        
    # Display connection to other features
    st.info(f"""
    **Connected Features:**
    - Budget data is being used to calculate your monthly savings contribution of ₹{monthly_savings:,.0f}
    - Your current investment portfolio of ₹{current_investments:,.0f} is used as your starting balance
    - Milestones you reach will be shared with Goal Settings
    """)
    
    
    # Create two columns
    col1, col2 = st.columns([2, 1])
    
    with col2:
        with st.form("projection_settings_form"):
            st.subheader("Projection Settings")
            
            current_savings = st.number_input(
                "Current Total Savings (₹)",
                min_value=0.0,  # Using float type
                value=float(st.session_state.projection_data['current_savings']),
                step=1000.0  # Adding step with float type
            )
            
            monthly_contribution = st.number_input(
                "Monthly Contribution (₹)",
                min_value=0.0,  # Using float type
                value=float(st.session_state.projection_data['monthly_contribution']),
                step=500.0  # Adding step with float type
            )
            
            expected_return_conservative = st.slider(
                "Conservative Return Rate (%)",
                min_value=4.0,
                max_value=9.0,
                value=st.session_state.projection_data['expected_return_conservative'],
                step=0.5
            )
            
            expected_return_moderate = st.slider(
                "Moderate Return Rate (%)",
                min_value=8.0,
                max_value=12.0,
                value=st.session_state.projection_data['expected_return_moderate'],
                step=0.5
            )
            
            expected_return_aggressive = st.slider(
                "Aggressive Return Rate (%)",
                min_value=10.0,
                max_value=16.0,
                value=st.session_state.projection_data['expected_return_aggressive'],
                step=0.5
            )
            
            inflation_rate = st.slider(
                "Expected Inflation Rate (%)",
                min_value=3.0,
                max_value=8.0,
                value=st.session_state.projection_data['inflation_rate'],
                step=0.5
            )
            
            time_horizon_years = st.slider(
                "Projection Years",
                min_value=5,
                max_value=40,
                value=st.session_state.projection_data['time_horizon_years']
            )
            
            submitted = st.form_submit_button("Update Projection")
            
            if submitted:
                # Update projection data
                st.session_state.projection_data.update({
                    'current_savings': current_savings,
                    'monthly_contribution': monthly_contribution,
                    'expected_return_conservative': expected_return_conservative,
                    'expected_return_moderate': expected_return_moderate,
                    'expected_return_aggressive': expected_return_aggressive,
                    'inflation_rate': inflation_rate,
                    'time_horizon_years': time_horizon_years
                })
                st.success("Projection updated!")
                st.rerun()
    
    with col1:
        # Generate projection data
        years = list(range(st.session_state.projection_data['time_horizon_years'] + 1))
        
        # Calculate projected growth for different scenarios
        conservative_growth = [st.session_state.projection_data['current_savings']]
        moderate_growth = [st.session_state.projection_data['current_savings']]
        aggressive_growth = [st.session_state.projection_data['current_savings']]
        
        for year in range(1, st.session_state.projection_data['time_horizon_years'] + 1):
            # Conservative scenario (lower returns)
            prev_conservative = conservative_growth[-1]
            new_conservative = prev_conservative * (1 + st.session_state.projection_data['expected_return_conservative']/100) + st.session_state.projection_data['monthly_contribution'] * 12
            conservative_growth.append(new_conservative)
            
            # Moderate scenario (medium returns)
            prev_moderate = moderate_growth[-1]
            new_moderate = prev_moderate * (1 + st.session_state.projection_data['expected_return_moderate']/100) + st.session_state.projection_data['monthly_contribution'] * 12
            moderate_growth.append(new_moderate)
            
            # Aggressive scenario (higher returns)
            prev_aggressive = aggressive_growth[-1]
            new_aggressive = prev_aggressive * (1 + st.session_state.projection_data['expected_return_aggressive']/100) + st.session_state.projection_data['monthly_contribution'] * 12
            aggressive_growth.append(new_aggressive)
        
        # Calculate inflation-adjusted values
        inflation_factor = [(1 / (1 + st.session_state.projection_data['inflation_rate']/100)) ** year for year in years]
        conservative_real = [amount * factor for amount, factor in zip(conservative_growth, inflation_factor)]
        moderate_real = [amount * factor for amount, factor in zip(moderate_growth, inflation_factor)]
        aggressive_real = [amount * factor for amount, factor in zip(aggressive_growth, inflation_factor)]
        
        # Create growth projection chart
        fig = go.Figure()
        
        fig.add_trace(go.Scatter(
            x=years,
            y=conservative_growth,
            mode='lines',
            name='Conservative (Nominal)',
            line=dict(color='#4682B4', width=1)
        ))
        
        fig.add_trace(go.Scatter(
            x=years,
            y=moderate_growth,
            mode='lines',
            name='Moderate (Nominal)',
            line=dict(color='#FF7F50', width=1)
        ))
        
        fig.add_trace(go.Scatter(
            x=years,
            y=aggressive_growth,
            mode='lines',
            name='Aggressive (Nominal)',
            line=dict(color='#9370DB', width=1)
        ))
        
        fig.add_trace(go.Scatter(
            x=years,
            y=conservative_real,
            mode='lines',
            name='Conservative (Real)',
            line=dict(color='#4682B4', width=3)
        ))
        
        fig.add_trace(go.Scatter(
            x=years,
            y=moderate_real,
            mode='lines',
            name='Moderate (Real)',
            line=dict(color='#FF7F50', width=3)
        ))
        
        fig.add_trace(go.Scatter(
            x=years,
            y=aggressive_real,
            mode='lines',
            name='Aggressive (Real)',
            line=dict(color='#9370DB', width=3)
        ))
        
        fig.update_layout(
            title='Projected Wealth Growth',
            xaxis_title='Years',
            yaxis_title='Amount (₹)',
            legend_title='Scenarios',
            template='plotly_dark',
            height=500,
            hovermode='x unified'
        )
        
        fig.update_yaxes(tickformat=',')
        
        st.plotly_chart(fig, use_container_width=True)
        
        # Create milestone markers
        st.write("### Financial Milestones")
        st.write("Based on the moderate growth projection, you could reach these milestones:")
        
        milestone_amounts = [
            {"label": "First ₹5 Lakhs", "amount": 500000},
            {"label": "First ₹10 Lakhs", "amount": 1000000},
            {"label": "First ₹25 Lakhs", "amount": 2500000},
            {"label": "First ₹50 Lakhs", "amount": 5000000},
            {"label": "First ₹1 Crore", "amount": 10000000},
            {"label": "First ₹2 Crores", "amount": 20000000},
            {"label": "First ₹5 Crores", "amount": 50000000}
        ]
        
        milestone_data = []
        
        for milestone in milestone_amounts:
            # Find when milestone is crossed in moderate scenario
            for i, amount in enumerate(moderate_growth):
                if amount >= milestone["amount"] and i > 0:
                    milestone_year = i
                    milestone_data.append({
                        "label": milestone["label"],
                        "year": milestone_year,
                        "amount": milestone["amount"],
                        "actual_amount": moderate_growth[milestone_year]
                    })
                    break
        
        # Sort milestones by year
        milestone_data.sort(key=lambda x: x["year"])
        
        # Display milestones in a timeline format
        for milestone in milestone_data:
            year_text = f"Year {milestone['year']}" if milestone['year'] <= st.session_state.projection_data['time_horizon_years'] else "Beyond projection"
            
            if milestone['year'] <= st.session_state.projection_data['time_horizon_years']:
                st.markdown(f"""
                <div style="display: flex; margin-bottom: 10px; background-color: rgba(100,181,246,0.1); padding: 10px; border-radius: 5px;">
                    <div style="font-size: 24px; margin-right: 10px;">🏆</div>
                    <div style="flex-grow: 1;">
                        <div style="font-weight: bold;">{milestone['label']}</div>
                        <div style="font-size: 12px;">{year_text} ({datetime.now().year + milestone['year']})</div>
                        <div style="font-size: 12px; color: #888;">Projected: ₹{milestone['actual_amount']:,.0f}</div>
                    </div>
                </div>
                """, unsafe_allow_html=True)
    
    # Retirement Analysis
    st.write("### Retirement Analysis")
    
    age = st.slider("Your Current Age", 18, 60, 30)
    retirement_age = st.slider("Expected Retirement Age", age + 1, 80, 60)
    
    years_to_retirement = retirement_age - age
    years_in_retirement = 90 - retirement_age  # Assuming life expectancy of 90
    
    # Calculate retirement corpus
    if years_to_retirement <= st.session_state.projection_data['time_horizon_years']:
        retirement_corpus_nominal = moderate_growth[years_to_retirement]
        retirement_corpus_real = moderate_real[years_to_retirement]
        
        # Calculate sustainable monthly withdrawal (4% rule)
        monthly_withdrawal_nominal = (retirement_corpus_nominal * 0.04) / 12
        monthly_withdrawal_real = (retirement_corpus_real * 0.04) / 12
        
        retirement_cols = st.columns(3)
        
        with retirement_cols[0]:
            st.metric(
                "Retirement Corpus (Nominal)",
                f"₹{retirement_corpus_nominal:,.0f}"
            )
        
        with retirement_cols[1]:
            st.metric(
                "Retirement Corpus (Real)",
                f"₹{retirement_corpus_real:,.0f}",
                delta=f"{(retirement_corpus_real/retirement_corpus_nominal - 1)*100:.1f}% vs Nominal",
                delta_color="off"
            )
        
        with retirement_cols[2]:
            st.metric(
                "Sustainable Monthly Income",
                f"₹{monthly_withdrawal_real:,.0f}",
                delta="Real Value"
            )
        
        # Retirement readiness
        readiness_percentage = min(100, (retirement_corpus_real / (monthly_withdrawal_real * 12 * years_in_retirement)) * 100)
        
        st.write("### Retirement Readiness")
        st.progress(readiness_percentage / 100)
        
        if readiness_percentage >= 100:
            st.success(f"You're on track to be fully prepared for retirement! Your projected savings should cover your expenses through age 90.")
            
            # Add option to share this milestone
            if st.button("🎯 Record as Milestone"):
                # Add retirement readiness to journey achievements
                st.session_state.journey_data['achievements'].append({
                    'date': datetime.now().strftime("%Y-%m-%d"),
                    'description': "Achieved 100% retirement readiness! 🎉",
                    'type': 'goal_complete'
                })
                
                # Save journey data
                save_journey_data()
                
                # Share with goal settings
                try:
                    # Get current goal data
                    goal_data = load_data("goal_settings") or {}
                    
                    # Add milestone to goal achievements
                    if 'achievements' not in goal_data:
                        goal_data['achievements'] = []
                        
                    goal_data['achievements'].append({
                        'date': datetime.now().strftime("%Y-%m-%d"),
                        'description': "Achieved 100% retirement readiness!",
                        'source': 'Financial Journey',
                        'completed': True
                    })
                    
                    # Save updated goal data
                    save_data("goal_settings", goal_data)
                    
                    st.success("Retirement milestone recorded and shared with Goal Settings!")
                    st.rerun()
                except Exception as e:
                    st.success("Retirement milestone recorded!")
                    st.warning(f"Could not share with Goal Settings: {str(e)}")
                    st.rerun()
                
        elif readiness_percentage >= 75:
            st.info(f"You're {readiness_percentage:.1f}% of the way to full retirement readiness. Consider increasing your monthly contributions slightly.")
        elif readiness_percentage >= 50:
            st.warning(f"You're {readiness_percentage:.1f}% of the way to full retirement readiness. Consider increasing your savings rate or adjusting your retirement age.")
        else:
            st.error(f"You're only {readiness_percentage:.1f}% of the way to retirement readiness. Consider significantly increasing your savings rate, delaying retirement, or adjusting your retirement lifestyle expectations.")

if __name__ == "__main__":
    show()