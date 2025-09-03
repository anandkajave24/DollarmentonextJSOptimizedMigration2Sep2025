import streamlit as st
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
from datetime import datetime, timedelta
import json

def show():
    st.title("💰 BudgetBuddy - Smart Indian Household Budget Manager")
    
    # Introduction
    st.write("""
    Welcome to BudgetBuddy! Let's make household budget management simple and effective.
    Track your expenses, set budgets, and get personalized insights for your Indian household.
    """)
    
    # Initialize session state for budget data
    if 'budget_data' not in st.session_state:
        st.session_state.budget_data = {
            'monthly_income': 0,
            'expenses': {},
            'savings_goal': 0,
            'categories': {
                'Essential': [
                    'Groceries',
                    'Rent/Home EMI',
                    'Utilities',
                    'House Help Salary',
                    'Milk/Daily Essentials',
                    'Transportation'
                ],
                'Lifestyle': [
                    'Dining Out',
                    'Entertainment',
                    'Shopping',
                    'Personal Care'
                ],
                'Financial': [
                    'Insurance',
                    'Investments',
                    'Loan Payments',
                    'Emergency Fund'
                ],
                'Others': [
                    'Education',
                    'Healthcare',
                    'Miscellaneous'
                ]
            }
        }

    # Tabs for different features
    tabs = st.tabs([
        "Monthly Budget", 
        "Expense Tracker", 
        "Insights & Planning",
        "Savings Goals"
    ])
    
    with tabs[0]:
        show_monthly_budget()
    
    with tabs[1]:
        show_expense_tracker()
    
    with tabs[2]:
        show_insights()
    
    with tabs[3]:
        show_savings_goals()

def show_monthly_budget():
    st.header("📊 Monthly Budget Setup")
    
    col1, col2 = st.columns(2)
    
    with col1:
        income = st.number_input(
            "Monthly Income (₹)",
            min_value=0,
            value=st.session_state.budget_data['monthly_income'],
            step=1000,
            help="Enter your total monthly household income"
        )
        st.session_state.budget_data['monthly_income'] = income
    
    with col2:
        savings_target = st.slider(
            "Target Monthly Savings (%)",
            min_value=0,
            max_value=70,
            value=20,
            help="Recommended: Save 20-30% of your income"
        )
    
    # Budget allocation
    st.subheader("Budget Allocation")
    st.write("Set your monthly budget for each category:")
    
    for category, subcategories in st.session_state.budget_data['categories'].items():
        with st.expander(f"{category} Expenses", expanded=True):
            for item in subcategories:
                key = f"{category}_{item}"
                current_value = st.session_state.budget_data['expenses'].get(key, 0)
                amount = st.number_input(
                    f"{item} (₹)",
                    min_value=0,
                    value=current_value,
                    step=100,
                    key=f"budget_{key}"
                )
                st.session_state.budget_data['expenses'][key] = amount
    
    # Calculate total expenses and savings
    total_expenses = sum(st.session_state.budget_data['expenses'].values())
    actual_savings = income - total_expenses
    savings_percentage = (actual_savings / income * 100) if income > 0 else 0
    
    # Display summary
    st.subheader("Monthly Summary")
    col1, col2, col3 = st.columns(3)
    
    with col1:
        st.metric(
            "Total Income",
            f"₹{income:,}",
            help="Your monthly household income"
        )
    
    with col2:
        st.metric(
            "Total Expenses",
            f"₹{total_expenses:,}",
            delta=f"₹{income - total_expenses:,} remaining",
            delta_color="normal"
        )
    
    with col3:
        st.metric(
            "Savings",
            f"₹{actual_savings:,}",
            f"{savings_percentage:.1f}% of income",
            delta_color="normal" if savings_percentage >= savings_target else "inverse"
        )
    
    # Visual breakdown of expenses
    if total_expenses > 0:
        st.subheader("Expense Breakdown")
        expense_data = []
        for category, subcategories in st.session_state.budget_data['categories'].items():
            for item in subcategories:
                key = f"{category}_{item}"
                amount = st.session_state.budget_data['expenses'].get(key, 0)
                if amount > 0:
                    expense_data.append({
                        'Category': category,
                        'Item': item,
                        'Amount': amount
                    })
        
        if expense_data:
            df_expenses = pd.DataFrame(expense_data)
            
            # Treemap visualization
            fig = px.treemap(
                df_expenses,
                path=['Category', 'Item'],
                values='Amount',
                title='Expense Distribution'
            )
            st.plotly_chart(fig, use_container_width=True)
            
            # Category-wise pie chart
            fig_pie = px.pie(
                df_expenses,
                values='Amount',
                names='Category',
                title='Expenses by Category',
                hole=0.4
            )
            st.plotly_chart(fig_pie, use_container_width=True)

def show_expense_tracker():
    st.header("📝 Daily Expense Tracker")
    
    # Initialize expenses list in session state
    if 'daily_expenses' not in st.session_state:
        st.session_state.daily_expenses = []
    
    # Add new expense
    st.subheader("Add New Expense")
    
    col1, col2, col3 = st.columns(3)
    
    with col1:
        expense_date = st.date_input(
            "Date",
            datetime.now().date(),
            max_value=datetime.now().date()
        )
    
    with col2:
        expense_category = st.selectbox(
            "Category",
            list(st.session_state.budget_data['categories'].keys())
        )
    
    with col3:
        selected_category = st.session_state.budget_data['categories'][expense_category]
        expense_item = st.selectbox(
            "Item",
            selected_category
        )
    
    col1, col2 = st.columns(2)
    
    with col1:
        expense_amount = st.number_input(
            "Amount (₹)",
            min_value=0,
            step=1
        )
    
    with col2:
        expense_note = st.text_input(
            "Note (optional)",
            placeholder="Add details about the expense"
        )
    
    if st.button("Add Expense", type="primary"):
        new_expense = {
            'date': expense_date.strftime('%Y-%m-%d'),
            'category': expense_category,
            'item': expense_item,
            'amount': expense_amount,
            'note': expense_note
        }
        st.session_state.daily_expenses.append(new_expense)
        st.success("Expense added successfully!")
        st.rerun()
    
    # Show expense history
    if st.session_state.daily_expenses:
        st.subheader("Recent Expenses")
        
        df_daily = pd.DataFrame(st.session_state.daily_expenses)
        df_daily['date'] = pd.to_datetime(df_daily['date'])
        df_daily = df_daily.sort_values('date', ascending=False)
        
        # Summary metrics
        today = datetime.now().date()
        df_daily['date_only'] = df_daily['date'].dt.date
        
        today_expenses = df_daily[df_daily['date_only'] == today]['amount'].sum()
        week_expenses = df_daily[
            df_daily['date_only'] >= (today - timedelta(days=7))
        ]['amount'].sum()
        month_expenses = df_daily[
            df_daily['date_only'] >= (today - timedelta(days=30))
        ]['amount'].sum()
        
        col1, col2, col3 = st.columns(3)
        
        with col1:
            st.metric("Today's Expenses", f"₹{today_expenses:,}")
        
        with col2:
            st.metric("This Week", f"₹{week_expenses:,}")
        
        with col3:
            st.metric("This Month", f"₹{month_expenses:,}")
        
        # Expense history table
        st.dataframe(
            df_daily[['date', 'category', 'item', 'amount', 'note']].style.format({
                'amount': '₹{:,.2f}'
            }),
            hide_index=True
        )
        
        # Trend analysis
        st.subheader("Expense Trends")
        daily_totals = df_daily.groupby('date_only')['amount'].sum().reset_index()
        
        fig = px.line(
            daily_totals,
            x='date_only',
            y='amount',
            title='Daily Expense Trend'
        )
        st.plotly_chart(fig, use_container_width=True)

def show_insights():
    st.header("🔍 Budget Insights & Recommendations")
    
    if not st.session_state.budget_data['expenses']:
        st.warning("Please set up your monthly budget first to get personalized insights.")
        return
    
    # Calculate key metrics
    income = st.session_state.budget_data['monthly_income']
    total_expenses = sum(st.session_state.budget_data['expenses'].values())
    savings = income - total_expenses
    savings_rate = (savings / income * 100) if income > 0 else 0
    
    # Expense ratios
    expense_ratios = {}
    for category, subcategories in st.session_state.budget_data['categories'].items():
        category_total = sum(
            st.session_state.budget_data['expenses'].get(f"{category}_{item}", 0)
            for item in subcategories
        )
        expense_ratios[category] = (category_total / income * 100) if income > 0 else 0
    
    # Display insights
    st.subheader("Financial Health Check")
    
    # Savings Rate Analysis
    if savings_rate < 20:
        st.error("⚠️ Your savings rate is below the recommended 20%")
        st.markdown("""
        **Recommendations:**
        - Review non-essential expenses
        - Look for areas to reduce spending
        - Consider additional income sources
        """)
    elif savings_rate >= 20 and savings_rate < 30:
        st.warning("Your savings rate is good, but there's room for improvement")
    else:
        st.success("Excellent savings rate! Keep up the good work!")
    
    # Category-specific insights
    st.subheader("Category Analysis")
    
    # Housing costs (Rent/EMI + Utilities)
    housing_cost = (
        st.session_state.budget_data['expenses'].get('Essential_Rent/Home EMI', 0) +
        st.session_state.budget_data['expenses'].get('Essential_Utilities', 0)
    )
    housing_ratio = (housing_cost / income * 100) if income > 0 else 0
    
    if housing_ratio > 40:
        st.warning(
            f"Housing costs are {housing_ratio:.1f}% of your income. " +
            "Consider options to reduce this below 40%"
        )
    
    # Essential vs Discretionary spending
    essential_spending = sum(
        st.session_state.budget_data['expenses'].get(f"Essential_{item}", 0)
        for item in st.session_state.budget_data['categories']['Essential']
    )
    essential_ratio = (essential_spending / income * 100) if income > 0 else 0
    
    st.write(f"Essential expenses make up {essential_ratio:.1f}% of your income")
    
    # Recommendations
    st.subheader("💡 Smart Budget Tips")
    
    tips = [
        "Consider the 50/30/20 rule: 50% needs, 30% wants, 20% savings",
        "Track daily expenses to identify spending patterns",
        "Look for opportunities to reduce fixed costs",
        "Build an emergency fund covering 6 months of expenses",
        "Review and adjust your budget monthly"
    ]
    
    for tip in tips:
        st.markdown(f"• {tip}")
    
    # Budget optimization suggestions
    st.subheader("Budget Optimization")
    
    if expense_ratios.get('Lifestyle', 0) > 30:
        st.warning(
            f"Lifestyle expenses are {expense_ratios['Lifestyle']:.1f}% of your income. " +
            "Consider reducing discretionary spending."
        )
    
    if expense_ratios.get('Financial', 0) < 10:
        st.warning(
            "Consider increasing allocation to investments and emergency fund"
        )

def show_savings_goals():
    st.header("🎯 Savings Goals")

    # Initialize savings goals if not present
    if 'savings_goals' not in st.session_state:
        st.session_state.savings_goals = []

    # Add new goal
    st.subheader("Add New Savings Goal")

    col1, col2 = st.columns(2)

    with col1:
        goal_name = st.text_input("Goal Name", placeholder="e.g., Emergency Fund")
        goal_amount = st.number_input("Target Amount (₹)", min_value=1000, step=1000, value=10000)

    with col2:
        goal_date = st.date_input(
            "Target Date",
            min_value=datetime.now().date()
        )
        goal_priority = st.selectbox(
            "Priority",
            ["High", "Medium", "Low"]
        )

    if st.button("Add Goal", type="primary"):
        new_goal = {
            'name': goal_name,
            'target_amount': goal_amount,
            'target_date': goal_date.strftime('%Y-%m-%d'),
            'priority': goal_priority,
            'current_amount': 0
        }
        st.session_state.savings_goals.append(new_goal)
        st.success("Goal added successfully!")
        st.rerun()

    # Display existing goals
    if st.session_state.savings_goals:
        st.subheader("Your Savings Goals")

        for goal in st.session_state.savings_goals:
            with st.expander(f"🎯 {goal['name']} - ₹{goal['target_amount']:,}"):
                # Safe progress calculation with validation
                current_amount = float(goal.get('current_amount', 0))
                target_amount = float(goal.get('target_amount', 1000))  # Default to 1000 if not set

                # Ensure we don't divide by zero
                if target_amount > 0:
                    progress = (current_amount / target_amount * 100)
                else:
                    progress = 0
                    st.warning("Invalid target amount. Please set a valid goal amount.")

                # Timeline calculation with validation
                try:
                    target_date = datetime.strptime(goal['target_date'], '%Y-%m-%d').date()
                    days_remaining = (target_date - datetime.now().date()).days

                    # Ensure we don't divide by zero or negative days
                    if days_remaining > 0:
                        monthly_needed = (target_amount - current_amount) / (days_remaining / 30)
                    else:
                        monthly_needed = target_amount - current_amount
                        st.warning("Goal date has passed. Consider updating the target date.")
                except (ValueError, TypeError):
                    days_remaining = 0
                    monthly_needed = target_amount - current_amount
                    st.error("Invalid date format. Please set a valid target date.")

                col1, col2 = st.columns(2)

                with col1:
                    st.metric(
                        "Current Progress",
                        f"₹{current_amount:,}",
                        f"{progress:.1f}%"
                    )
                    st.progress(min(progress/100, 1.0))

                with col2:
                    st.metric(
                        "Monthly Saving Needed",
                        f"₹{monthly_needed:,.2f}",
                        f"{days_remaining} days remaining"
                    )

                # Update progress
                new_amount = st.number_input(
                    "Update Current Amount",
                    value=float(goal['current_amount']),
                    min_value=0.0,
                    step=1000.0,
                    key=f"update_{goal['name']}"
                )

                if st.button("Update Progress", key=f"update_btn_{goal['name']}"):
                    goal['current_amount'] = new_amount
                    st.success("Progress updated!")
                    st.rerun()

if __name__ == "__main__":
    show()