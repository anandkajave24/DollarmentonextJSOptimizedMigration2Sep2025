import streamlit as st
import pandas as pd
import plotly.express as px
from datetime import datetime, timedelta
import json

def load_goals():
    try:
        return pd.read_json('data/goals.json')
    except:
        return pd.DataFrame(columns=['name', 'type', 'category', 'target_amount', 'current_savings', 
                                   'target_date', 'savings_plan', 'savings_amount', 'auto_save'])

def save_goals(goals_df):
    goals_df.to_json('data/goals.json')

def calculate_monthly_savings(target_amount, current_savings, months):
    remaining = target_amount - current_savings
    return round(remaining / months) if months > 0 else 0

def show_goal_overview():
    st.title("Goals Overview")
    if 'goals_df' not in st.session_state:
        st.session_state.goals_df = load_goals()
        
    total_goals = len(st.session_state.goals_df)
    total_target = st.session_state.goals_df['target_amount'].sum()
    total_saved = st.session_state.goals_df['current_savings'].sum()
    
    col1, col2, col3 = st.columns(3)
    with col1:
        st.metric("Total Goals", total_goals)
    with col2:
        st.metric("Total Target Amount", f"₹{total_target:,.2f}")
    with col3:
        st.metric("Total Saved", f"₹{total_saved:,.2f}")
    
    # Summary by Category
    st.subheader("Goals by Category")
    for category in ["Short-Term", "Mid-Term", "Long-Term"]:
        cat_goals = st.session_state.goals_df[st.session_state.goals_df['category'] == category]
        if not cat_goals.empty:
            with st.expander(f"{category} Goals"):
                for _, goal in cat_goals.iterrows():
                    progress = (goal['current_savings'] / goal['target_amount']) * 100
                    st.write(f"🎯 {goal['name']}")
                    st.progress(min(progress/100, 1.0))
                    st.write(f"Progress: ₹{goal['current_savings']:,.2f} of ₹{goal['target_amount']:,.2f} ({progress:.1f}%)")

def show_goal_settings():
    st.title("Goal Settings")

    # Initialize session state
    if 'goals_df' not in st.session_state:
        st.session_state.goals_df = load_goals()

    # Track Your Goals Button
    if st.button("📊 Track Your Goals", type="primary"):
        st.session_state.show_overview = True
        st.rerun()  

    if st.session_state.get('show_overview', False):
        show_goal_overview()
        if st.button("← Back to Goal Settings"):
            st.session_state.show_overview = False
            st.rerun()  
        st.stop()

    # Display existing goals
    if not st.session_state.goals_df.empty:
        for _, goal in st.session_state.goals_df.iterrows():
            with st.expander(f"🎯 {goal['name']} - ₹{goal['target_amount']:,.2f}"):
                progress = (goal['current_savings'] / goal['target_amount']) * 100
                st.progress(min(progress, 100))
                st.write(f"Target Date: {goal['target_date']}")
                st.write(f"Monthly Savings: ₹{goal['savings_amount']:,.2f}")

                # Progress bar and metrics
                col1, col2 = st.columns(2)
                with col1:
                    st.write(f"Progress: ₹{goal['current_savings']:,.2f} of ₹{goal['target_amount']:,.2f} ({progress:.1f}%)")
                    st.progress(min(progress/100, 1.0))

                # Pie chart for goal progress
                with col2:
                    fig = px.pie(
                        values=[goal['current_savings'], goal['target_amount'] - goal['current_savings']],
                        names=['Saved', 'Remaining'],
                        title=f"Goal Progress - {goal['name']}",
                        color_discrete_sequence=['#00C853', '#FF5252'],
                        hole=0.4
                    )
                    fig.update_layout(
                        showlegend=True,
                        height=200,
                        margin=dict(t=30, b=0, l=0, r=0)
                    )
                    st.plotly_chart(fig, use_container_width=True)

                col1, col2 = st.columns(2)
                with col1:
                    if st.button(f"Edit Goal", key=f"edit_{goal['name']}", type="secondary"):
                        st.session_state.editing_goal = goal['name']
                        st.rerun()
                with col2:
                    if st.button(f"Delete Goal", key=f"delete_{goal['name']}", type="secondary"):
                        st.session_state.goals_df = st.session_state.goals_df[
                            st.session_state.goals_df['name'] != goal['name']]
                        save_goals(st.session_state.goals_df)
                        st.rerun()

    # Add New Goal Section
    st.header("Add New Goal")
    
    # Step 1: Choose Goal Type
    predefined_goals = {
        "Short-Term": ["Emergency Fund", "Buying a Gadget", "Vacation & Travel", "Debt Payoff"],
        "Mid-Term": ["Buying a Vehicle", "Home Down Payment", "Child's School Fees", "Business Startup Fund"],
        "Long-Term": ["Retirement Fund", "Child's Higher Education", "Buying a Dream Home", "Wealth Creation"]
    }
    
    goal_type = st.radio("Goal Type", ["Standard Goal", "Custom Goal"])
    
    if goal_type == "Standard Goal":
        category = st.selectbox("Goal Category", ["Short-Term", "Mid-Term", "Long-Term"])
        goal_name = st.selectbox("Select Goal", predefined_goals[category])
    else:
        goal_name = st.text_input("Goal Name")
        category = st.selectbox("Goal Category", ["Short-Term", "Mid-Term", "Long-Term"])
    
    # Step 3: Goal Details
    col1, col2 = st.columns(2)
    with col1:
        target_amount = st.number_input("Target Amount (₹)", min_value=1000, step=1000)
        current_savings = st.number_input("Current Savings (₹)", min_value=0, step=1000)
    
    with col2:
        min_date = datetime.now().date()
        max_date = min_date + timedelta(days=365*30)  # 30 years max
        target_date = st.date_input("Target Date", min_value=min_date, max_value=max_date)
    
    # Calculate suggested monthly savings
    months_to_goal = (target_date - datetime.now().date()).days / 30
    suggested_monthly = calculate_monthly_savings(target_amount, current_savings, months_to_goal)
    
    st.info(f"💡 Suggested Monthly Savings: ₹{suggested_monthly:,.2f}")
    
    # Step 4: Savings Plan
    savings_plan = st.radio(
        "Choose Savings Plan",
        ["Fixed Monthly Savings", "Percentage of Income", "Round-Up Savings"]
    )
    
    if savings_plan == "Fixed Monthly Savings":
        savings_amount = st.number_input("Monthly Savings Amount (₹)", 
                                       value=int(suggested_monthly), step=100)
    elif savings_plan == "Percentage of Income":
        income = st.number_input("Monthly Income (₹)", min_value=0, step=1000)
        percentage = st.slider("Savings Percentage", 1, 100, 20)
        savings_amount = income * (percentage/100)
    else:
        savings_amount = suggested_monthly
        st.info("Round-Up Savings will automatically save the spare change from your transactions")
    
    auto_save = st.toggle("Enable Auto-Save")
    
    # Add/Update Goal Button
    if st.button("Save Goal", type="primary"):
        new_goal = {
            'name': goal_name,
            'type': goal_type,
            'category': category,
            'target_amount': target_amount,
            'current_savings': current_savings,
            'target_date': target_date.strftime('%Y-%m-%d'),
            'savings_plan': savings_plan,
            'savings_amount': savings_amount,
            'auto_save': auto_save
        }
        
        # Update existing goal or add new one
        if hasattr(st.session_state, 'editing_goal'):
            st.session_state.goals_df.loc[
                st.session_state.goals_df['name'] == st.session_state.editing_goal
            ] = pd.Series(new_goal)
            del st.session_state.editing_goal
        else:
            st.session_state.goals_df = pd.concat([
                st.session_state.goals_df,
                pd.DataFrame([new_goal])
            ], ignore_index=True)
        
        save_goals(st.session_state.goals_df)
        st.success("Goal saved successfully!")
        st.rerun()

if __name__ == "__main__":
    show_goal_settings()