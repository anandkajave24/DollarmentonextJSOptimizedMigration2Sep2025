import streamlit as st
import plotly.express as px
import plotly.graph_objects as go
import pandas as pd
import numpy as np
from datetime import datetime, timedelta
from utils.dashboard_data_manager import DashboardDataManager

def create_summary_card(title, value, change, prefix="₹", suffix=""):
    """Create a metric card with consistent styling"""
    st.markdown(f"""
    <div style="
        background: rgba(255,255,255,0.1);
        padding: 20px;
        border-radius: 10px;
        margin: 10px 0;
        border: 1px solid rgba(255,255,255,0.2);
    ">
        <div style="color: #888; font-size: 14px;">{title}</div>
        <div style="color: white; font-size: 24px; margin: 10px 0;">
            {prefix if prefix else ''}{value:,.0f}{suffix if suffix else ''}
        </div>
        <div style="color: {'#00FF00' if change >= 0 else '#FF4B4B'}; font-size: 14px;">
            {' ↑ ' if change >= 0 else ' ↓ '}{abs(change):.1f}%
        </div>
    </div>
    """, unsafe_allow_html=True)

def create_progress_bar(label, current, total, color="rgba(0,255,0,0.3)"):
    """Create a consistent progress bar"""
    progress = (current / total) * 100 if total > 0 else 0
    st.markdown(f"""
    <div style="margin: 10px 0;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
            <span style="color: white;">{label}</span>
            <span style="color: white;">{current:,.0f} / {total:,.0f}</span>
        </div>
        <div style="
            height: 20px;
            background: linear-gradient(to right, 
                {color} {min(progress, 100)}%, 
                rgba(255,255,255,0.1) {min(progress, 100)}%);
            border-radius: 10px;
            position: relative;
        ">
            <div style="
                position: absolute;
                padding: 0 10px;
                color: white;
                line-height: 20px;
                font-size: 12px;
                width: 100%;
                text-align: center;
            ">{progress:.1f}%</div>
        </div>
    </div>
    """, unsafe_allow_html=True)

def show():
    st.title("📊 Financial Health Dashboard")

    # Initialize data manager
    data_manager = DashboardDataManager()
    data = data_manager.get_consolidated_data()

    if not data:
        st.error("Unable to load dashboard data. Please try again.")
        return

    # Financial Health Score Section
    st.markdown("### 🏥 Financial Health Indicators")
    health_col1, health_col2, health_col3, health_col4 = st.columns(4)

    with health_col1:
        create_summary_card(
            "Overall Health Score",
            data['overall_health']['score'],
            data['overall_health']['delta'],
            prefix="",
            suffix="/100"
        )

    with health_col2:
        create_summary_card(
            "Budget Health",
            data['budget_health']['score'],
            data['budget_health']['delta'],
            prefix="",
            suffix="/100"
        )

    with health_col3:
        create_summary_card(
            "Investment Health",
            data['risk']['diversification_score'],
            5.5,
            prefix="",
            suffix="/100"
        )

    with health_col4:
        savings_rate = (data['spending']['savings_rate'] / 0.3) * 100  # Target 30% savings
        create_summary_card(
            "Savings Health",
            min(savings_rate, 100),
            data['spending']['savings_rate'] * 100,
            prefix="",
            suffix="/100"
        )

    # Summary Metrics
    st.markdown("### 💰 Financial Overview")
    col1, col2, col3, col4 = st.columns(4)

    with col1:
        create_summary_card(
            "Net Worth",
            data['portfolio']['net_worth'],
            data['portfolio']['net_worth_change']
        )

    with col2:
        savings = data['spending']['monthly_income'] - data['spending']['monthly_spending']
        create_summary_card(
            "Monthly Savings",
            savings,
            data['spending']['savings_rate'] * 100
        )

    with col3:
        create_summary_card(
            "Investment Returns",
            data['market']['return_rate'],
            2.5,
            prefix="",
            suffix="%"
        )

    with col4:
        create_summary_card(
            "Risk Score",
            data['risk']['risk_tolerance'],
            5.5,
            prefix="",
            suffix=""
        )

    # Portfolio Section
    st.markdown("### 📈 Investment Portfolio")
    portfolio_col1, portfolio_col2 = st.columns(2)

    with portfolio_col1:
        # Asset Allocation
        fig_portfolio = go.Figure(data=[go.Pie(
            labels=list(data['portfolio']['asset_allocation'].keys()),
            values=list(data['portfolio']['asset_allocation'].values()),
            hole=.3,
            marker=dict(colors=['#FF9999', '#66B2FF', '#99FF99', '#FFCC99'])
        )])

        fig_portfolio.update_layout(
            title="Asset Allocation",
            height=300,
            margin=dict(l=20, r=20, t=30, b=20),
            paper_bgcolor='rgba(0,0,0,0)',
            font={'color': "white"},
            showlegend=True
        )
        st.plotly_chart(fig_portfolio, use_container_width=True)

    with portfolio_col2:
        # Market Performance
        st.markdown("#### Sector Performance")
        for sector, performance in data['market']['sector_performance'].items():
            st.markdown(f"""
            <div style="margin: 10px 0;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                    <span style="color: white;">{sector}</span>
                    <span style="color: {'#00FF00' if performance >= 0 else '#FF4B4B'}">{performance:+.1f}%</span>
                </div>
            </div>
            """, unsafe_allow_html=True)

    # Goals Progress
    st.markdown("### 🎯 Financial Goals")
    goals_col1, goals_col2 = st.columns(2)

    with goals_col1:
        st.markdown("#### Short-term Goals")
        create_progress_bar(
            "Emergency Fund",
            data['goals']['emergency_fund']['current'],
            data['goals']['emergency_fund']['target'],
            color="rgba(255,165,0,0.3)"
        )
        create_progress_bar(
            "Investment Goal",
            data['goals']['investment']['current'],
            data['goals']['investment']['target'],
            color="rgba(0,255,255,0.3)"
        )

    with goals_col2:
        st.markdown("#### Long-term Goals")
        create_progress_bar(
            "Retirement",
            data['goals']['retirement']['current'],
            data['goals']['retirement']['target'],
            color="rgba(128,0,128,0.3)"
        )
        create_progress_bar(
            "Debt Reduction",
            data['goals']['debt_reduction']['current'],
            data['goals']['debt_reduction']['target'],
            color="rgba(255,99,71,0.3)"
        )

    # Risk and Tax Overview
    st.markdown("### 🔒 Risk & Tax Analysis")
    risk_col1, risk_col2 = st.columns(2)

    with risk_col1:
        st.markdown("#### Risk Metrics")
        metrics = {
            "Portfolio Risk": data['risk']['portfolio_risk'],
            "Diversification": data['risk']['diversification_score'],
            "Insurance Coverage": data['risk']['insurance_coverage']
        }

        fig_risk = go.Figure()
        for idx, (metric, value) in enumerate(metrics.items()):
            fig_risk.add_trace(go.Bar(
                x=[value],
                y=[metric],
                orientation='h',
                marker_color=['rgba(0,255,0,0.3)', 'rgba(255,165,0,0.3)', 'rgba(0,255,255,0.3)'][idx]
            ))

        fig_risk.update_layout(
            height=200,
            margin=dict(l=20, r=20, t=20, b=20),
            paper_bgcolor='rgba(0,0,0,0)',
            plot_bgcolor='rgba(0,0,0,0)',
            font={'color': "white"},
            showlegend=False,
            xaxis=dict(range=[0, 100])
        )
        st.plotly_chart(fig_risk, use_container_width=True)

    with risk_col2:
        st.markdown("#### Tax Efficiency")
        st.markdown(f"""
        <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 10px;">
            <div style="margin-bottom: 10px;">
                <span style="color: white;">Tax Savings: </span>
                <span style="color: #00FF00;">₹{data['tax']['tax_savings']:,.2f}</span>
            </div>
            <div style="margin-bottom: 10px;">
                <span style="color: white;">Tax Efficiency Score: </span>
                <span style="color: #00FF00;">{data['tax']['tax_efficiency']}%</span>
            </div>
            <div>
                <span style="color: white;">Potential Additional Savings: </span>
                <span style="color: #FFD700;">₹{data['tax']['potential_savings']:,.2f}</span>
            </div>
        </div>
        """, unsafe_allow_html=True)

    # Financial Wellness Parameters
    st.markdown("### 📈 Financial Wellness Analysis")
    wellness_col1, wellness_col2 = st.columns(2)

    with wellness_col1:
        st.markdown("#### Key Financial Ratios")
        # Debt Service Coverage Ratio
        debt_ratio = min((data['spending']['monthly_income'] / 
                         (data['credit']['used_credit'] / 12)) * 100 
                        if data['credit']['used_credit'] > 0 else 100, 100)
        create_progress_bar(
            "Debt Service Coverage",
            debt_ratio,
            100.0
        )

        # Emergency Fund Ratio
        emergency_ratio = (data['goals']['emergency_fund']['current'] / 
                         (data['spending']['monthly_spending'] * 6)) * 100
        create_progress_bar(
            "Emergency Fund Coverage",
            min(emergency_ratio, 100),
            100.0
        )

        # Investment Diversification
        create_progress_bar(
            "Portfolio Diversification",
            data['risk']['diversification_score'],
            100.0
        )

    with wellness_col2:
        st.markdown("#### Risk & Tax Efficiency")
        # Tax Efficiency Score
        create_progress_bar(
            "Tax Optimization",
            data['tax']['tax_efficiency'],
            100.0
        )

        # Investment Risk Score
        create_progress_bar(
            "Risk Management",
            data['risk']['portfolio_risk'],
            100.0
        )

        # Credit Health
        credit_health = (data['credit']['credit_score'] / 900) * 100
        create_progress_bar(
            "Credit Health",
            credit_health,
            100.0
        )

    # Short Term vs Long Term Goals
    st.markdown("### 🎯 Goals Balance")
    goals_col1, goals_col2, goals_col3 = st.columns(3)

    with goals_col1:
        create_summary_card(
            "Short-term Goals Progress",
            (data['goals']['emergency_fund']['current'] / 
             data['goals']['emergency_fund']['target']) * 100,
            5.5,
            prefix="",
            suffix="%"
        )

    with goals_col2:
        create_summary_card(
            "Mid-term Goals Progress",
            (data['goals']['investment']['current'] / 
             data['goals']['investment']['target']) * 100,
            3.2,
            prefix="",
            suffix="%"
        )

    with goals_col3:
        create_summary_card(
            "Long-term Goals Progress",
            (data['goals']['retirement']['current'] / 
             data['goals']['retirement']['target']) * 100,
            2.8,
            prefix="",
            suffix="%"
        )


    # Connected Features
    st.markdown("### 🔗 Connected Features")
    st.markdown("""
    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 20px;">
        <a href="/comparison_tool" style="text-decoration: none;">
            <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 10px; text-align: center;">
                <div style="font-size: 24px;">📊</div>
                <div style="color: white;">Investment Comparison</div>
            </div>
        </a>
        <a href="/tax_calculator" style="text-decoration: none;">
            <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 10px; text-align: center;">
                <div style="font-size: 24px;">💰</div>
                <div style="color: white;">Tax Calculator</div>
            </div>
        </a>
        <a href="/debt_payoff" style="text-decoration: none;">
            <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 10px; text-align: center;">
                <div style="font-size: 24px;">💳</div>
                <div style="color: white;">Debt Payoff</div>
            </div>
        </a>
        <a href="/credit_score" style="text-decoration: none;">
            <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 10px; text-align: center;">
                <div style="font-size: 24px;">📈</div>
                <div style="color: white;">Credit Score</div>
            </div>
        </a>
        <a href="/risk_assessment" style="text-decoration: none;">
            <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 10px; text-align: center;">
                <div style="font-size: 24px;">⚖️</div>
                <div style="color: white;">Risk Assessment</div>
            </div>
        </a>
        <a href="/spending_patterns" style="text-decoration: none;">
            <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 10px; text-align: center;">
                <div style="font-size: 24px;">📊</div>
                <div style="color: white;">Spending Patterns</div>
            </div>
        </a>
        <a href="/goal_settings" style="text-decoration: none;">
            <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 10px; text-align: center;">
                <div style="font-size: 24px;">🎯</div>
                <div style="color: white;">Financial Goals</div>
            </div>
        </a>
        <a href="/market_data" style="text-decoration: none;">
            <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 10px; text-align: center;">
                <div style="font-size: 24px;">📊</div>
                <div style="color: white;">Market Data</div>
            </div>
        </a>
        <a href="/financial_calculators" style="text-decoration: none;">
            <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 10px; text-align: center;">
                <div style="font-size: 24px;">🧮</div>
                <div style="color: white;">Financial Calculators</div>
            </div>
        </a>
        <a href="/indian_investments" style="text-decoration: none;">
            <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 10px; text-align: center;">
                <div style="font-size: 24px;">🏦</div>
                <div style="color: white;">Indian Investments</div>
            </div>
        </a>
        <a href="/budget_buddy" style="text-decoration: none;">
            <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 10px; text-align: center;">
                <div style="font-size: 24px;">💼</div>
                <div style="color: white;">Budget Buddy</div>
            </div>
        </a>
        <a href="/government_schemes" style="text-decoration: none;">
            <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 10px; text-align: center;">
                <div style="font-size: 24px;">🏛️</div>
                <div style="color: white;">Government Schemes</div>
            </div>
        </a>
    </div>
    """, unsafe_allow_html=True)

    # Auto-refresh every 5 minutes
    if 'last_refresh' not in st.session_state:
        st.session_state.last_refresh = datetime.now()

    if (datetime.now() - st.session_state.last_refresh).seconds > 300:
        st.rerun()

if __name__ == "__main__":
    show()