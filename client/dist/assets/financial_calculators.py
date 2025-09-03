import streamlit as st
import plotly.express as px
import pandas as pd
import numpy as np
from datetime import datetime, date
import sys
import os

# Add parent directory to path to import from pages
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from pages.goal_settings import get_quick_stats
from utils.navigation import navigate_to

# Import calculator modules
# We'll define our own implementations if the imports fail
import plotly.graph_objects as go
new_calculators_available = True

# Import the vehicle comparison calculators
try:
    from utils.calculators.vehicle_comparison_calculator import show_vehicle_comparison_calculator
except ImportError:
    def show_vehicle_comparison_calculator():
        st.error("Vehicle comparison calculator module not found.")

# Import the smart vehicle comparison calculator
try:
    from utils.calculators.smart_vehicle_comparison import show_smart_vehicle_comparison
except ImportError:
    def show_smart_vehicle_comparison():
        st.error("Smart vehicle comparison calculator module not found.")

# Import the bike loan calculator
try:
    from utils.calculators.bike_loan_calculator import show_bike_loan_calculator
except ImportError:
    def show_bike_loan_calculator():
        st.error("Bike loan calculator module not found.")

# Import the credit card EMI calculator
try:
    from utils.calculators.credit_card_emi_calculator import show_credit_card_emi_calculator
except ImportError:
    def show_credit_card_emi_calculator():
        st.error("Credit card EMI calculator module not found.")

# Define the HRA Exemption calculator function
def show_hra_calculator():
    st.header("House Rent Allowance (HRA) Exemption Calculator")
    st.write("""
    Calculate your eligible HRA exemption for income tax purposes. HRA exemption is the minimum of:
    1. Actual HRA received
    2. 50% of basic salary (for metro cities) or 40% (for non-metro)
    3. Rent paid minus 10% of basic salary
    """)
    
    col1, col2 = st.columns(2)
    with col1:
        basic_salary = st.number_input(
            "Basic Salary (Monthly) (₹)",
            min_value=0,
            value=30000,
            step=1000
        )
        
        hra_received = st.number_input(
            "HRA Received (Monthly) (₹)",
            min_value=0,
            value=15000,
            step=1000
        )
    
    with col2:
        rent_paid = st.number_input(
            "Rent Paid (Monthly) (₹)",
            min_value=0,
            value=18000,
            step=1000
        )
        
        metro_city = st.selectbox(
            "City Type",
            ["Metro (Delhi, Mumbai, Chennai, Kolkata)", "Non-Metro"],
            index=0
        )
        is_metro = metro_city.startswith("Metro")
        
    annual_basic = basic_salary * 12
    annual_hra = hra_received * 12
    annual_rent = rent_paid * 12
    
    if st.button("Calculate HRA Exemption", use_container_width=True):
        # Calculate HRA exemption using the function
        exemption, exemption1, exemption2, exemption3 = calculate_hra_exemption(
            annual_basic, annual_rent, annual_hra, is_metro
        )
        
        # Monthly exemption values
        monthly_exemption = exemption / 12
        
        # Display results
        st.subheader("HRA Exemption Calculation")
        
        col1, col2 = st.columns(2)
        with col1:
            st.metric("Annual Exemption", f"₹{exemption:,.2f}")
            st.metric("Monthly Exemption", f"₹{monthly_exemption:,.2f}")
        
        with col2:
            st.metric("Taxable HRA (Annual)", f"₹{annual_hra - exemption:,.2f}")
            st.metric("Tax Saving (30% bracket)", f"₹{exemption * 0.3:,.2f}")
        
        # Explanation of calculation
        st.subheader("Calculation Details")
        
        st.write("HRA exemption is the **minimum** of the following three values:")
        
        col1, col2, col3 = st.columns(3)
        with col1:
            st.info(f"""
            **1. Actual HRA Received**
            ₹{exemption1:,.2f} per year
            """)
        
        with col2:
            percent = "50%" if is_metro else "40%"
            st.info(f"""
            **2. {percent} of Basic Salary**
            {percent} of ₹{annual_basic:,.2f} = ₹{exemption2:,.2f}
            """)
        
        with col3:
            st.info(f"""
            **3. Rent - 10% of Basic**
            ₹{annual_rent:,.2f} - ₹{annual_basic * 0.1:,.2f} = ₹{exemption3:,.2f}
            """)
        
        # Visualization
        data = {
            'Category': ['Actual HRA', '% of Basic', 'Rent - 10% Basic', 'Your Exemption'],
            'Amount': [exemption1, exemption2, exemption3, exemption]
        }
        
        df = pd.DataFrame(data)
        
        # Create the bar chart
        fig = px.bar(
            df, 
            x='Category', 
            y='Amount',
            title="HRA Exemption Components",
            color='Category',
            text_auto='.2s'
        )
        
        fig.update_layout(yaxis_title="Amount (₹)")
        st.plotly_chart(fig, use_container_width=True)

# Define the Lumpsum Investment calculator function
def show_lumpsum_calculator():
    st.header("Lumpsum Investment Calculator")
    st.write("""
    Calculate the future value of your one-time (lumpsum) investments. 
    This calculator helps you project the growth of investments like fixed deposits, mutual funds, or direct equity.
    """)
    
    col1, col2 = st.columns(2)
    with col1:
        principal = st.number_input(
            "Investment Amount (₹)",
            min_value=1000,
            value=100000,
            step=10000
        )
        
        expected_return = st.number_input(
            "Expected Annual Return (%)",
            min_value=1.0,
            max_value=30.0,
            value=12.0,
            step=0.5
        )
    
    with col2:
        investment_period = st.number_input(
            "Investment Period (Years)",
            min_value=1,
            max_value=40,
            value=10,
            step=1
        )
        
        inflation_rate = st.number_input(
            "Expected Inflation Rate (%)",
            min_value=0.0,
            max_value=15.0,
            value=5.0,
            step=0.5
        )
    
    if st.button("Calculate Returns", use_container_width=True):
        # Calculate future value
        rate = expected_return / 100
        future_value = principal * ((1 + rate) ** investment_period)
        interest_earned = future_value - principal
        
        # Calculate inflation-adjusted value
        inflation_rate_decimal = inflation_rate / 100
        real_rate = (1 + rate) / (1 + inflation_rate_decimal) - 1
        inflation_adjusted_value = principal * ((1 + real_rate) ** investment_period)
        
        # Calculate CAGR (Compound Annual Growth Rate)
        cagr = (future_value / principal) ** (1 / investment_period) - 1
        real_cagr = (inflation_adjusted_value / principal) ** (1 / investment_period) - 1
        
        # Display results
        st.subheader("Investment Summary")
        
        col1, col2 = st.columns(2)
        with col1:
            st.metric("Initial Investment", f"₹{principal:,.2f}")
            st.metric("Future Value", f"₹{future_value:,.2f}")
            st.metric("Total Growth", f"{((future_value/principal)-1)*100:.2f}%")
        
        with col2:
            st.metric("Interest Earned", f"₹{interest_earned:,.2f}")
            st.metric("Inflation-Adjusted Value", f"₹{inflation_adjusted_value:,.2f}")
            st.metric("Real Growth (Inflation Adjusted)", f"{((inflation_adjusted_value/principal)-1)*100:.2f}%")
        
        # CAGR information
        st.subheader("Compound Annual Growth Rate (CAGR)")
        col1, col2 = st.columns(2)
        with col1:
            st.metric("Nominal CAGR", f"{cagr*100:.2f}%")
        with col2:
            st.metric("Real CAGR (Inflation Adjusted)", f"{real_cagr*100:.2f}%")
        
        # Create visualization data
        years = list(range(investment_period + 1))
        values = [principal * ((1 + rate) ** year) for year in years]
        inflation_adjusted_values = [principal * ((1 + real_rate) ** year) for year in years]
        
        # Create dataframe
        df = pd.DataFrame({
            'Year': years,
            'Future Value': values,
            'Inflation-Adjusted Value': inflation_adjusted_values
        })
        
        # Plot the growth
        fig = px.line(
            df, 
            x='Year', 
            y=['Future Value', 'Inflation-Adjusted Value'],
            title="Investment Growth Over Time",
            labels={'value': 'Amount (₹)', 'variable': 'Value Type'}
        )
        fig.update_layout(xaxis_title="Year")
        st.plotly_chart(fig, use_container_width=True)
        
        # Breakup of invested amount and returns
        st.subheader("Investment Breakup")
        fig = px.pie(
            names=['Principal', 'Interest Earned'],
            values=[principal, interest_earned],
            title="Principal vs Returns",
            hole=0.4,
            color_discrete_sequence=['#1f77b4', '#ff7f0e']
        )
        st.plotly_chart(fig, use_container_width=True)

# Define the PPF calculator function
def show_ppf_calculator():
    st.header("Public Provident Fund (PPF) Calculator")
    st.write("""
    Calculate returns on your PPF investments. PPF is a popular long-term investment option in India 
    with tax benefits under Section 80C and tax-free returns.
    """)
    
    col1, col2 = st.columns(2)
    with col1:
        annual_investment = st.number_input(
            "Annual Investment (₹)",
            min_value=500,
            max_value=150000,
            value=50000,
            step=5000
        )
        
    with col2:
        interest_rate = st.number_input(
            "Interest Rate (%)",
            min_value=1.0,
            max_value=12.0,
            value=7.1,
            step=0.1
        )
        
        years = st.number_input(
            "Investment Period (Years)",
            min_value=15,
            max_value=30,
            value=15,
            step=5
        )
    
    if st.button("Calculate PPF Returns", use_container_width=True):
        # Define the calculate_ppf function locally if it's not available
        def calculate_ppf(annual_investment, interest_rate, years=15):
            """Calculate Public Provident Fund (PPF) returns"""
            interest_rate = interest_rate / 100  # Convert percentage to decimal
            
            # Initialize variables
            opening_balance = 0
            total_investment = 0
            total_interest = 0
            yearly_details = []
            
            # Calculate year by year
            for year in range(1, years + 1):
                # Add this year's investment
                total_investment += annual_investment
                
                # Calculate interest for this year
                interest = (opening_balance + annual_investment) * interest_rate
                total_interest += interest
                
                # Calculate closing balance
                closing_balance = opening_balance + annual_investment + interest
                
                # Store yearly details
                yearly_details.append([year, opening_balance, annual_investment, interest, closing_balance])
                
                # Update opening balance for next year
                opening_balance = closing_balance
            
            maturity_value = opening_balance
            
            return maturity_value, total_investment, total_interest, yearly_details
            
        results = calculate_ppf(annual_investment, interest_rate, years)
        
        # Display results in a user-friendly way
        st.subheader("PPF Investment Summary")
        
        col1, col2, col3 = st.columns(3)
        with col1:
            st.metric("Total Investment", f"₹{annual_investment * years:,.2f}")
        with col2:
            st.metric("Interest Earned", f"₹{results[2]:,.2f}")
        with col3:
            st.metric("Maturity Value", f"₹{results[0]:,.2f}")
        
        # Create a dataframe for the yearly breakdown
        df = pd.DataFrame(results[3])
        
        # Rename columns for better presentation
        df.columns = ['Year', 'Opening Balance', 'Annual Investment', 'Interest Earned', 'Closing Balance']
        
        # Display the yearly breakdown
        st.subheader("Year-wise PPF Growth")
        st.dataframe(df.style.format({
            'Opening Balance': '₹{:,.2f}',
            'Annual Investment': '₹{:,.2f}',
            'Interest Earned': '₹{:,.2f}',
            'Closing Balance': '₹{:,.2f}'
        }))
        
        # Create a visualization
        fig = px.line(df, x='Year', y='Closing Balance', title="PPF Balance Growth Over Time")
        fig.update_layout(xaxis_title="Year", yaxis_title="Amount (₹)")
        st.plotly_chart(fig, use_container_width=True)

# Define the FD calculator function
def show_post_office_ppf_calculator():
    st.header("Post Office PPF Calculator 🏤")
    
    st.write("""
    Calculate returns on your Post Office Public Provident Fund (PPF) investments. Post Office PPF is 
    a secure long-term investment option backed by the Government of India with tax benefits under 
    Section 80C and completely tax-free returns.
    """)
    
    st.info("""
    ### About Post Office PPF
    
    - Minimum initial deposit: ₹500
    - Maximum annual deposit: ₹1,50,000
    - Minimum tenure: 15 years (can be extended in blocks of 5 years)
    - Interest is compounded annually
    - Partial withdrawal allowed from 7th year onwards
    - Loan facility available between 3rd and 6th year
    - 100% tax-free returns and eligible for tax deduction under Section 80C
    - Current interest rate: 7.1% p.a. (Q1 FY 2025-26)
    """)
    
    col1, col2 = st.columns(2)
    with col1:
        annual_investment = st.number_input(
            "Annual Investment (₹)",
            min_value=500,
            max_value=150000,
            value=50000,
            step=5000,
            help="Annual investment amount (Min: ₹500, Max: ₹1,50,000)"
        )
        
        interest_rate = st.number_input(
            "Interest Rate (%)",
            min_value=1.0,
            max_value=12.0,
            value=7.1,
            step=0.1,
            help="Current Post Office PPF interest rate (updated quarterly by govt)"
        )
        
    with col2:
        years = st.number_input(
            "Investment Period (Years)",
            min_value=15,
            max_value=50,
            value=15,
            step=5,
            help="Minimum 15 years, extendable in blocks of 5 years"
        )
        
        withdrawal_option = st.selectbox(
            "Include Partial Withdrawals?",
            options=["No", "Yes"],
            index=0,
            help="Select 'Yes' to simulate partial withdrawals from 7th year onwards"
        )
    
    if withdrawal_option == "Yes":
        st.write("#### Partial Withdrawal Configuration")
        st.write("You can withdraw up to 50% of the balance at the end of the 4th preceding financial year.")
        
        withdrawal_percentage = st.slider(
            "Withdrawal Percentage",
            min_value=0,
            max_value=50,
            value=0,
            step=5,
            help="Percentage of eligible amount to withdraw each year from 7th year onwards"
        )
    else:
        withdrawal_percentage = 0
    
    if st.button("Calculate Post Office PPF Returns", use_container_width=True):
        with st.spinner("Calculating PPF growth..."):
            # Calculate PPF returns
            maturity_amount, total_investment, total_interest, yearly_details = calculate_post_office_ppf(
                annual_investment, interest_rate, years
            )
            
            # Apply withdrawals if selected
            if withdrawal_percentage > 0:
                # Create a copy of yearly details to modify
                modified_yearly_details = yearly_details.copy()
                total_withdrawals = 0
                
                for i, year_data in enumerate(yearly_details):
                    year = year_data['year']
                    
                    # Apply withdrawals from 7th year onwards
                    if year >= 7 and withdrawal_percentage > 0:
                        # Calculate withdrawal limit (50% of balance at end of 4th preceding year)
                        if year - 5 >= 0:
                            withdrawal_base = yearly_details[year - 5]['closing_balance']
                            max_withdrawal = withdrawal_base * 0.5
                            actual_withdrawal = max_withdrawal * (withdrawal_percentage / 100)
                            
                            # Update balances for this and subsequent years
                            modified_yearly_details[i]['withdrawal'] = actual_withdrawal
                            modified_yearly_details[i]['closing_balance'] -= actual_withdrawal
                            total_withdrawals += actual_withdrawal
                            
                            # Adjust subsequent years' opening balances
                            if i + 1 < len(modified_yearly_details):
                                for j in range(i + 1, len(modified_yearly_details)):
                                    modified_yearly_details[j]['opening_balance'] = modified_yearly_details[j-1]['closing_balance']
                                    # Recalculate interest
                                    investment = modified_yearly_details[j]['investment']
                                    opening_bal = modified_yearly_details[j]['opening_balance']
                                    modified_yearly_details[j]['interest'] = (opening_bal + investment) * (interest_rate / 100)
                                    modified_yearly_details[j]['closing_balance'] = opening_bal + investment + modified_yearly_details[j]['interest']
                
                # Update the final values with withdrawal adjustments
                maturity_amount = modified_yearly_details[-1]['closing_balance']
                yearly_details = modified_yearly_details
            
            # Display key metrics
            st.subheader("📊 PPF Investment Summary")
            
            col1, col2, col3 = st.columns(3)
            with col1:
                st.metric(
                    "Total Investment",
                    f"₹{total_investment:,.2f}"
                )
            with col2:
                st.metric(
                    "Interest Earned",
                    f"₹{total_interest:,.2f}"
                )
            with col3:
                st.metric(
                    "Maturity Amount",
                    f"₹{maturity_amount:,.2f}"
                )
            
            # Display additional metrics if withdrawals were applied
            if withdrawal_percentage > 0:
                col1, col2 = st.columns(2)
                with col1:
                    st.metric(
                        "Total Withdrawals",
                        f"₹{total_withdrawals:,.2f}"
                    )
                with col2:
                    st.metric(
                        "Net Gain",
                        f"₹{maturity_amount + total_withdrawals - total_investment:,.2f}"
                    )
            
            # Return on Investment metrics
            st.subheader("📈 Return on Investment")
            
            roi_col1, roi_col2, roi_col3 = st.columns(3)
            with roi_col1:
                absolute_roi = ((maturity_amount - total_investment) / total_investment) * 100
                st.metric(
                    "Absolute ROI",
                    f"{absolute_roi:.2f}%",
                    help="Total returns as percentage of investment"
                )
            with roi_col2:
                annual_roi = ((maturity_amount / total_investment) ** (1 / years) - 1) * 100
                st.metric(
                    "Annual ROI",
                    f"{annual_roi:.2f}%",
                    help="Annualized return on investment"
                )
            with roi_col3:
                interest_ratio = total_interest / total_investment
                st.metric(
                    "Interest to Investment Ratio",
                    f"{interest_ratio:.2f}x",
                    help="How many times your investment you earn as interest"
                )
            
            # Visualization
            st.subheader("PPF Growth Over Time")
            
            # Prepare data for visualization
            years_list = [item['year'] for item in yearly_details]
            opening_balances = [item['opening_balance'] for item in yearly_details]
            investments = [item['investment'] for item in yearly_details]
            interests = [item['interest'] for item in yearly_details]
            closing_balances = [item['closing_balance'] for item in yearly_details]
            
            # Create visualization with plotly
            fig = go.Figure()
            
            # Add investment bars
            fig.add_trace(
                go.Bar(
                    x=years_list,
                    y=investments,
                    name="Annual Investment",
                    marker_color="#3498DB",
                    hovertemplate="Year %{x}<br>Investment: ₹%{y:,.2f}"
                )
            )
            
            # Add interest bars
            fig.add_trace(
                go.Bar(
                    x=years_list,
                    y=interests,
                    name="Interest Earned",
                    marker_color="#2ECC71",
                    hovertemplate="Year %{x}<br>Interest: ₹%{y:,.2f}"
                )
            )
            
            # Add withdrawals if applicable
            if withdrawal_percentage > 0:
                withdrawals = [item.get('withdrawal', 0) for item in yearly_details]
                fig.add_trace(
                    go.Bar(
                        x=years_list,
                        y=[-w for w in withdrawals],  # Negative to show going down
                        name="Withdrawals",
                        marker_color="#E74C3C",
                        hovertemplate="Year %{x}<br>Withdrawal: ₹%{y:,.2f}"
                    )
                )
            
            # Add balance line
            fig.add_trace(
                go.Scatter(
                    x=years_list,
                    y=closing_balances,
                    name="Account Balance",
                    mode="lines+markers",
                    line=dict(color="#8E44AD", width=3),
                    hovertemplate="Year %{x}<br>Balance: ₹%{y:,.2f}"
                )
            )
            
            # Update layout
            fig.update_layout(
                title="Post Office PPF Growth Chart",
                xaxis_title="Year",
                yaxis_title="Amount (₹)",
                barmode="stack",
                hovermode="x unified",
                legend=dict(
                    orientation="h",
                    yanchor="bottom",
                    y=1.02,
                    xanchor="right",
                    x=1
                )
            )
            
            st.plotly_chart(fig, use_container_width=True)
            
            # Yearly breakup table
            with st.expander("View Yearly Details"):
                # Convert yearly details to DataFrame
                df = pd.DataFrame(yearly_details)
                
                # Add withdrawals column if needed
                if withdrawal_percentage > 0 and 'withdrawal' not in df.columns:
                    df['withdrawal'] = 0
                
                # Format and display
                formatted_df = df.copy()
                display_columns = ['year', 'opening_balance', 'investment', 'interest', 'closing_balance']
                
                if withdrawal_percentage > 0:
                    display_columns.insert(4, 'withdrawal')
                
                formatted_df = formatted_df[display_columns]
                column_renames = {
                    'year': 'Year',
                    'opening_balance': 'Opening Balance',
                    'investment': 'Annual Investment',
                    'interest': 'Interest Earned',
                    'withdrawal': 'Withdrawal',
                    'closing_balance': 'Closing Balance'
                }
                
                st.dataframe(
                    formatted_df.rename(columns=column_renames).style.format({
                        'Opening Balance': '₹{:,.2f}',
                        'Annual Investment': '₹{:,.2f}',
                        'Interest Earned': '₹{:,.2f}',
                        'Withdrawal': '₹{:,.2f}',
                        'Closing Balance': '₹{:,.2f}'
                    }),
                    use_container_width=True
                )
            
            # Special features section
            st.subheader("🔍 Special Post Office PPF Features")
            
            tab1, tab2, tab3 = st.tabs(["Loan Facility", "Tax Benefits", "Extension Options"])
            
            with tab1:
                st.write("""
                ### Post Office PPF Loan Facility
                
                You can avail a loan against your Post Office PPF account from the 3rd financial 
                year up to the 6th financial year. Key features:
                
                - Loan amount: Up to 25% of the balance at the end of the 2nd preceding financial year
                - Interest rate: 1% higher than the prevailing PPF interest rate
                - Repayment: Must be repaid within 36 months
                """)
                
                if years >= 3:
                    st.subheader("Your Loan Eligibility Timeline")
                    loan_eligibility = []
                    for i, year_data in enumerate(yearly_details):
                        year = year_data['year']
                        if 3 <= year <= 6:
                            if year > 3:
                                loan_amount = yearly_details[year-3]['closing_balance'] * 0.25
                            else:
                                loan_amount = 0  # In 3rd year, no 2nd preceding year balance
                            
                            loan_eligibility.append({
                                "Year": year,
                                "Eligible Amount": loan_amount,
                                "Status": "Eligible"
                            })
                    
                    if loan_eligibility:
                        loan_df = pd.DataFrame(loan_eligibility)
                        st.dataframe(
                            loan_df.style.format({
                                "Eligible Amount": "₹{:,.2f}"
                            }),
                            use_container_width=True
                        )
                    else:
                        st.info("Your investment period doesn't reach the loan eligibility period (3-6 years).")
            
            with tab2:
                st.write("""
                ### Tax Benefits of Post Office PPF
                
                Post Office PPF offers dual tax benefits under the EEE (Exempt-Exempt-Exempt) category:
                
                1. **Section 80C Benefits:** Annual investment up to ₹1,50,000 qualifies for deduction under Section 80C
                2. **Tax-Free Returns:** Interest earned and maturity amount are completely tax-free
                """)
                
                # Calculate tax savings
                tax_slabs = {
                    "10%": 0.1,
                    "20%": 0.2,
                    "30%": 0.3
                }
                
                selected_slab = st.selectbox("Select Your Tax Slab", options=list(tax_slabs.keys()), index=1)
                tax_rate = tax_slabs[selected_slab]
                
                deduction_amount = min(annual_investment, 150000)
                annual_tax_saving = deduction_amount * tax_rate
                total_tax_saving = annual_tax_saving * years
                
                st.success(f"""
                ### Your Tax Savings
                
                - **Annual tax saving:** ₹{annual_tax_saving:,.2f}
                - **Total tax saving over {years} years:** ₹{total_tax_saving:,.2f}
                - **Effective annual gain:** {(annual_tax_saving / annual_investment) * 100:.2f}% of your annual investment
                
                In addition, the entire interest of ₹{total_interest:,.2f} is tax-free!
                """)
            
            with tab3:
                st.write("""
                ### Extension Options
                
                After the mandatory 15-year lock-in period, you can:
                
                1. **Close the account** and withdraw the entire amount
                2. **Extend with contributions** for 5-year blocks (unlimited times)
                3. **Extend without contributions** and continue earning interest
                """)
                
                if years > 15:
                    st.success(f"""
                    You've already planned for an extended period of {years} years, which includes an extension of {years - 15} years beyond the mandatory lock-in period.
                    """)
                else:
                    # Calculate extended balance
                    final_balance = yearly_details[-1]['closing_balance']
                    extension_years = 5
                    extended_balance = final_balance * ((1 + interest_rate/100) ** extension_years)
                    additional_interest = extended_balance - final_balance
                    
                    st.info(f"""
                    ### Potential 5-Year Extension (without contributions)
                    
                    If you extend your account for 5 more years after the initial 15-year period without making additional contributions:
                    
                    - **Maturity amount after 15 years:** ₹{final_balance:,.2f}
                    - **Additional interest earned in extension:** ₹{additional_interest:,.2f}
                    - **Extended balance after 20 years:** ₹{extended_balance:,.2f}
                    """)
            
            # Comparison with other investments
            st.subheader("📊 Comparison with Other Investments")
            
            comparison_data = {
                "Investment Type": ["Post Office PPF", "Bank FD", "NSC", "ELSS Mutual Fund", "Recurring Deposit"],
                "Interest/Return Rate": [f"{interest_rate}% p.a.", "5.75-7.25% p.a.", "7.7% p.a.", "10-12% p.a. (Variable)", "6.7-7.25% p.a."],
                "Lock-in Period": ["15 years", "Flexible", "5 years", "3 years", "Flexible"],
                "Tax Benefits": ["80C + Tax-free", "Taxable", "80C", "80C", "Taxable"],
                "Risk Level": ["Very Low", "Very Low", "Very Low", "Moderate-High", "Very Low"]
            }
            
            st.table(pd.DataFrame(comparison_data))
            
            # Tips and insights
            st.subheader("💡 Investment Tips")
            
            st.info("""
            ### Strategic Post Office PPF Investment Tips
            
            1. **Maximize Annual Contribution:** If possible, invest the maximum allowed ₹1,50,000 per year to maximize tax benefits and returns
            2. **Deposit Before 5th:** Make deposits before the 5th of each month to earn interest for that month
            3. **Open Multiple Accounts:** Open separate accounts for spouse and minors to increase family investment capacity
            4. **Laddering Strategy:** Create a PPF ladder by opening accounts in different years for enhanced liquidity
            5. **Extension Planning:** Plan extensions strategically based on your financial needs at maturity
            """)

def show_fd_calculator():
    st.header("Fixed Deposit (FD) Calculator")
    st.write("""
    Calculate returns on your fixed deposit investments. FDs are one of the most popular 
    and secure investment options in India.
    """)
    
    col1, col2 = st.columns(2)
    with col1:
        principal = st.number_input(
            "Principal Amount (₹)",
            min_value=1000,
            value=100000,
            step=1000
        )
        
        interest_rate = st.number_input(
            "Interest Rate (% p.a.)",
            min_value=1.0,
            max_value=10.0,
            value=6.5,
            step=0.25
        )
    
    with col2:
        tenure_years = st.number_input(
            "Tenure (Years)",
            min_value=0.25,
            max_value=10.0,
            value=1.0,
            step=0.25
        )
        
        compounding_options = ["Quarterly", "Monthly", "Half-Yearly", "Yearly"]
        compounding = st.selectbox(
            "Interest Compounding",
            options=compounding_options,
            index=0
        )
        
        compounding_mapping = {"Quarterly": 4, "Monthly": 12, "Half-Yearly": 2, "Yearly": 1}
        compounding_frequency = compounding_mapping[compounding]
    
    if st.button("Calculate FD Returns", use_container_width=True):
        # Define the calculate_fd function locally if it's not available
        def calculate_fd(principal, interest_rate, tenure_years, compounding_frequency=4):
            """Calculate Fixed Deposit returns"""
            rate = interest_rate / 100  # Convert percentage to decimal
            
            # Calculate compound interest using formula: P(1 + r/n)^(nt)
            # where P is principal, r is rate, n is compounding frequency, t is time in years
            maturity_amount = principal * (1 + rate/compounding_frequency)**(compounding_frequency*tenure_years)
            interest_earned = maturity_amount - principal
            
            return maturity_amount, interest_earned
            
        maturity_amount, interest_earned = calculate_fd(principal, interest_rate, tenure_years, compounding_frequency)
        
        # Display results
        st.subheader("FD Investment Summary")
        
        col1, col2, col3 = st.columns(3)
        with col1:
            st.metric("Principal Amount", f"₹{principal:,.2f}")
        with col2:
            st.metric("Interest Earned", f"₹{interest_earned:,.2f}")
        with col3:
            st.metric("Maturity Amount", f"₹{maturity_amount:,.2f}")
        
        # Create visualization data
        periods = int(tenure_years * 12)
        months = list(range(periods + 1))
        
        # Calculate month-wise growth
        monthly_rate = interest_rate / (100 * 12)
        amounts = [principal * (1 + monthly_rate) ** month for month in months]
        
        # Create dataframe
        df = pd.DataFrame({
            'Month': months,
            'Amount': amounts
        })
        
        # Plot the growth
        fig = px.line(df, x='Month', y='Amount', title="FD Growth Over Time")
        fig.update_layout(xaxis_title="Month", yaxis_title="Amount (₹)")
        st.plotly_chart(fig, use_container_width=True)

def show_rd_calculator():
    st.header("Recurring Deposit (RD) Calculator")
    st.write("""
    Calculate returns on your recurring deposit investments. RDs are a systematic savings option 
    that allows you to deposit a fixed amount every month while earning interest similar to FDs.
    """)
    
    col1, col2 = st.columns(2)
    with col1:
        monthly_investment = st.number_input(
            "Monthly Deposit Amount (₹)",
            min_value=100,
            value=5000,
            step=100
        )
        
        interest_rate = st.number_input(
            "Interest Rate (% p.a.)",
            min_value=1.0,
            max_value=10.0,
            value=6.5,
            step=0.1
        )
    
    with col2:
        tenure_years = st.number_input(
            "Tenure (Years)",
            min_value=0.5,
            max_value=10.0,
            value=5.0,
            step=0.5
        )
        
        compounding_options = ["Quarterly", "Monthly", "Half-Yearly", "Yearly"]
        compounding_selection = st.selectbox(
            "Interest Compounding",
            compounding_options,
            index=0
        )
        
        # Map compounding selection to frequency value
        compounding_frequency_map = {
            "Monthly": 12,
            "Quarterly": 4,
            "Half-Yearly": 2,
            "Yearly": 1
        }
        compounding_frequency = compounding_frequency_map[compounding_selection]
    
    # Convert years to months for calculation
    tenure_months = int(tenure_years * 12)
    
    if st.button("Calculate RD Returns", use_container_width=True):
        # Calculate RD returns
        maturity_amount, total_investment, interest_earned = calculate_rd(
            monthly_investment,
            interest_rate,
            tenure_months,
            compounding_frequency
        )
        
        # Display results
        st.subheader("RD Investment Summary")
        
        col1, col2, col3 = st.columns(3)
        with col1:
            st.metric("Total Investment", f"₹{total_investment:,.2f}")
        with col2:
            st.metric("Interest Earned", f"₹{interest_earned:,.2f}")
        with col3:
            st.metric("Maturity Amount", f"₹{maturity_amount:,.2f}")
        
        # Create visualization data
        months = list(range(tenure_months + 1))
        
        # Calculate month-wise growth (approximate)
        invested_amounts = [monthly_investment * i for i in months]
        
        # Approximate growth calculation (simplified for visualization)
        effective_monthly_rate = (interest_rate / 100) / 12
        cumulative_amounts = []
        
        for month in months:
            if month == 0:
                cumulative_amounts.append(0)
            else:
                # Simple approximation for visualization
                amount = monthly_investment * month
                interest = amount * effective_monthly_rate * month / 2  # Average interest
                cumulative_amounts.append(amount + interest)
        
        # Create dataframe
        df = pd.DataFrame({
            'Month': months,
            'Invested': invested_amounts,
            'Cumulative Value': cumulative_amounts
        })
        
        # Plot the growth
        fig = px.line(
            df, 
            x='Month', 
            y=['Invested', 'Cumulative Value'],
            labels={'value': 'Amount (₹)', 'variable': 'Component'},
            color_discrete_map={
                'Invested': '#1f77b4',
                'Cumulative Value': '#ff7f0e'
            }
        )
        
        fig.update_layout(
            title='Recurring Deposit Growth Over Time',
            xaxis_title='Months',
            yaxis_title='Amount (₹)',
            height=400
        )
        
        st.plotly_chart(fig, use_container_width=True)
        
        # Calculate effective annual return
        effective_return = ((maturity_amount / total_investment) ** (1 / tenure_years) - 1) * 100
        
        # Comparison with FD
        st.subheader("RD vs. FD Comparison")
        st.write("""
        How does your Recurring Deposit compare to investing the same total amount as a Fixed Deposit?
        """)
        
        # Calculate equivalent lumpsum FD amount and returns
        equivalent_fd_principal = total_investment
        fd_maturity, fd_interest = calculate_fd(
            equivalent_fd_principal, 
            interest_rate, 
            tenure_years,
            compounding_frequency
        )
        
        comparison_df = pd.DataFrame({
            'Investment Type': ['Recurring Deposit', 'Equivalent Fixed Deposit'],
            'Principal': [total_investment, equivalent_fd_principal],
            'Interest Earned': [interest_earned, fd_interest],
            'Maturity Amount': [maturity_amount, fd_maturity],
            'Effective Annual Return (%)': [effective_return, interest_rate]
        })
        
        # Format the dataframe for display
        formatted_df = comparison_df.copy()
        formatted_df['Principal'] = formatted_df['Principal'].apply(lambda x: f"₹{x:,.2f}")
        formatted_df['Interest Earned'] = formatted_df['Interest Earned'].apply(lambda x: f"₹{x:,.2f}")
        formatted_df['Maturity Amount'] = formatted_df['Maturity Amount'].apply(lambda x: f"₹{x:,.2f}")
        formatted_df['Effective Annual Return (%)'] = formatted_df['Effective Annual Return (%)'].apply(lambda x: f"{x:.2f}%")
        
        st.dataframe(formatted_df.set_index('Investment Type'), use_container_width=True)
        
        st.info(f"""
        **Key Insight**: With an RD, your money compounds gradually as you make monthly deposits, 
        resulting in a slightly lower effective return ({effective_return:.2f}%) compared to an FD with the 
        same interest rate ({interest_rate:.2f}%). However, RDs make it easier to build a disciplined 
        savings habit with smaller monthly contributions.
        """)
        
        # Add Tips & Advice Section
        with st.expander("📚 Tips & Advice for RD Investors"):
            st.markdown("""
            ### 📋 Recurring Deposit Investment Tips
            
            1. **Automatic Payments**: Set up auto-debit from your bank account to ensure you never miss a monthly installment.
            
            2. **Penalty Awareness**: Be aware that premature withdrawals or missed installments often attract penalties (typically 1% interest reduction).
            
            3. **Tax Considerations**: Interest earned on RDs is taxable according to your income tax slab. TDS applies if interest exceeds ₹40,000 annually (₹50,000 for senior citizens).
            
            4. **Laddering Strategy**: Create multiple RDs with different maturity periods for better liquidity management.
            
            5. **Special RD Schemes**: Look for banks offering special RD schemes with higher interest rates for specific customer segments.
            
            6. **Goal-based RDs**: Consider using RDs for specific short to medium-term financial goals such as vacation funds, festival expenses, or education fees.
            
            7. **Compare with Mutual Fund SIPs**: For longer-term goals (5+ years), compare potential returns with Mutual Fund SIPs which might offer higher returns but with market risk.
            """)

# Income Tax Calculator
def show_income_tax_calculator():
    st.header("Income Tax Calculator (FY 2024-25)")
    st.write("""
    Calculate your income tax liability under both old and new tax regimes. 
    Compare and find out which regime is more beneficial for you.
    """)
    
    # Income Details Tab
    st.subheader("Income Details")
    
    col1, col2 = st.columns(2)
    with col1:
        salary = st.number_input(
            "Annual Salary (₹)",
            min_value=0,
            value=800000,
            step=50000
        )
        
        other_income = st.number_input(
            "Other Income (₹)",
            min_value=0,
            value=0,
            step=10000
        )
    
    with col2:
        profession = st.selectbox(
            "Profession",
            ["Salaried", "Self-Employed/Business", "Professional"]
        )
        
        is_senior_citizen = st.selectbox(
            "Age Category",
            ["Below 60 years", "Senior Citizen (60-80 years)", "Super Senior Citizen (80+ years)"]
        )
    
    # Calculate gross total income
    gross_income = salary + other_income
    st.info(f"Gross Total Income: ₹{gross_income:,.2f}")
    
    # Deductions Section
    st.subheader("Deductions & Exemptions (Old Regime)")
    
    col1, col2 = st.columns(2)
    with col1:
        standard_deduction = 50000 if profession == "Salaried" else 0
        st.write(f"**Standard Deduction:** ₹{standard_deduction:,}")
        
        section_80c = st.number_input(
            "Section 80C Investments (₹)",
            min_value=0,
            max_value=150000,
            value=0,
            step=10000
        )
        
        section_80d = st.number_input(
            "Section 80D - Health Insurance (₹)",
            min_value=0,
            max_value=100000,
            value=0,
            step=5000
        )
    
    with col2:
        home_loan_interest = st.number_input(
            "Home Loan Interest (₹)",
            min_value=0,
            max_value=200000,
            value=0,
            step=10000
        )
        
        nps = st.number_input(
            "Section 80CCD(1B) - NPS (₹)",
            min_value=0,
            max_value=50000,
            value=0,
            step=5000
        )
        
        other_deductions = st.number_input(
            "Other Deductions (₹)",
            min_value=0,
            value=0,
            step=5000
        )
    
    # Calculate total deductions
    total_deductions = (
        standard_deduction + 
        section_80c + 
        section_80d + 
        home_loan_interest + 
        nps + 
        other_deductions
    )
    
    st.success(f"Total Deductions & Exemptions: ₹{total_deductions:,.2f}")
    
    # Calculate taxable income under both regimes
    taxable_income_old = max(0, gross_income - total_deductions)
    taxable_income_new = gross_income - 50000 if profession == "Salaried" else gross_income  # Only standard deduction in new regime
    
    st.write(f"**Taxable Income (Old Regime):** ₹{taxable_income_old:,.2f}")
    st.write(f"**Taxable Income (New Regime):** ₹{taxable_income_new:,.2f}")
    
    if st.button("Calculate Tax Liability", use_container_width=True):
        # Basic tax calculation functions
        def calculate_old_regime_tax(income):
            tax = 0
            if income <= 250000:
                tax = 0
            elif income <= 500000:
                tax = (income - 250000) * 0.05
            elif income <= 1000000:
                tax = 12500 + (income - 500000) * 0.2
            else:
                tax = 112500 + (income - 1000000) * 0.3
            
            cess = tax * 0.04
            return tax, cess, tax + cess
        
        def calculate_new_regime_tax(income):
            tax = 0
            if income <= 300000:
                tax = 0
            elif income <= 600000:
                tax = (income - 300000) * 0.05
            elif income <= 900000:
                tax = 15000 + (income - 600000) * 0.1
            elif income <= 1200000:
                tax = 45000 + (income - 900000) * 0.15
            elif income <= 1500000:
                tax = 90000 + (income - 1200000) * 0.2
            else:
                tax = 150000 + (income - 1500000) * 0.3
            
            cess = tax * 0.04
            return tax, cess, tax + cess
        
        # Calculate tax
        old_tax, old_cess, old_total = calculate_old_regime_tax(taxable_income_old)
        new_tax, new_cess, new_total = calculate_new_regime_tax(taxable_income_new)
        
        # Display results
        st.subheader("Tax Liability Comparison")
        
        col1, col2 = st.columns(2)
        with col1:
            st.write("### Old Tax Regime")
            st.metric("Income Tax", f"₹{old_tax:,.2f}")
            st.metric("Education Cess (4%)", f"₹{old_cess:,.2f}")
            st.metric("Total Tax Liability", f"₹{old_total:,.2f}")
        
        with col2:
            st.write("### New Tax Regime")
            st.metric("Income Tax", f"₹{new_tax:,.2f}")
            st.metric("Education Cess (4%)", f"₹{new_cess:,.2f}")
            st.metric("Total Tax Liability", f"₹{new_total:,.2f}")
        
        # Recommendation
        tax_diff = old_total - new_total
        if tax_diff > 0:
            st.success(f"""
            ### 💡 Recommendation
            **The New Tax Regime is more beneficial for you.**
            
            You save ₹{abs(tax_diff):,.2f} by choosing the New Regime.
            """)
        else:
            st.success(f"""
            ### 💡 Recommendation
            **The Old Tax Regime is more beneficial for you.**
            
            You save ₹{abs(tax_diff):,.2f} by choosing the Old Regime.
            """)
        
        # Visualization
        fig = px.bar(
            x=['Old Regime', 'New Regime'],
            y=[old_total, new_total],
            title="Tax Liability Comparison",
            labels={'x': 'Tax Regime', 'y': 'Tax Amount (₹)'}
        )
        st.plotly_chart(fig, use_container_width=True)

@st.cache_data
def calculate_compound_interest(principal, rate, time, frequency=12):
    """Calculate compound interest with optional monthly contributions"""
    rate = rate / 100  # Convert percentage to decimal
    amount = principal * (1 + rate/frequency)**(frequency*time)
    return amount

@st.cache_data
def calculate_simple_interest(principal, rate, time):
    """Calculate simple interest and total amount"""
    rate = rate / 100  # Convert percentage to decimal
    interest = principal * rate * time
    total_amount = principal + interest
    return interest, total_amount

@st.cache_data
def calculate_swp_returns(corpus, withdrawal_rate, expected_return, time_period):
    """Calculate Systematic Withdrawal Plan returns"""
    monthly_withdrawal = corpus * (withdrawal_rate/100/12)
    rate = expected_return/100/12  # Monthly rate
    months = time_period * 12

    # Calculate month-wise corpus and withdrawals
    corpus_values = []
    withdrawal_values = []
    remaining_corpus = corpus

    for month in range(months + 1):
        corpus_values.append(remaining_corpus)
        if month > 0:
            withdrawal_values.append(monthly_withdrawal)
            remaining_corpus = (remaining_corpus - monthly_withdrawal) * (1 + rate)
        else:
            withdrawal_values.append(0)

    total_withdrawal = sum(withdrawal_values)
    final_corpus = corpus_values[-1]

    return {
        'corpus_values': corpus_values,
        'withdrawal_values': withdrawal_values,
        'monthly_withdrawal': monthly_withdrawal,
        'total_withdrawal': total_withdrawal,
        'final_corpus': final_corpus
    }

@st.cache_data
def calculate_sip_returns(monthly_investment, expected_return, time_period):
    """Calculate returns for SIP investments"""
    rate = expected_return / 100 / 12  # Monthly rate
    months = time_period * 12

    # Formula for SIP calculation
    future_value = monthly_investment * ((1 + rate) * (((1 + rate)**months - 1) / rate))
    total_investment = monthly_investment * months
    returns = future_value - total_investment

    # Calculate year-wise growth for visualization
    years = list(range(time_period + 1))
    invested_amounts = []
    future_values = []

    for year in years:
        months = year * 12
        if months == 0:
            invested_amounts.append(0)
            future_values.append(0)
        else:
            invested = monthly_investment * months
            future = monthly_investment * ((1 + rate) * (((1 + rate)**months - 1) / rate))
            invested_amounts.append(invested)
            future_values.append(future)

    return future_value, total_investment, returns, years, invested_amounts, future_values

@st.cache_data
def calculate_retirement_needs(current_age, retirement_age, life_expectancy, 
                             monthly_expenses, inflation_rate, return_rate):
    """Calculate retirement needs and required monthly savings"""
    years_to_retirement = retirement_age - current_age
    retirement_duration = life_expectancy - retirement_age
    inflation_rate = inflation_rate / 100
    return_rate = return_rate / 100

    # Calculate future monthly expenses
    future_monthly_expenses = monthly_expenses * (1 + inflation_rate)**years_to_retirement
    total_needed = future_monthly_expenses * 12 * retirement_duration

    # Calculate required monthly savings
    monthly_payment = total_needed / ((1 + return_rate)**(years_to_retirement) - 1) / (return_rate * 12)

    return total_needed, monthly_payment

@st.cache_data
def calculate_stock_average(holdings, new_purchase_price, new_purchase_quantity):
    """Calculate average stock price after a new purchase"""
    if not holdings:
        return new_purchase_price, new_purchase_quantity, new_purchase_price * new_purchase_quantity, 0, 0
    
    total_quantity = sum(holding['quantity'] for holding in holdings) + new_purchase_quantity
    total_investment = sum(holding['price'] * holding['quantity'] for holding in holdings) + (new_purchase_price * new_purchase_quantity)
    average_price = total_investment / total_quantity
    
    # Calculate price impact
    old_average = sum(holding['price'] * holding['quantity'] for holding in holdings) / sum(holding['quantity'] for holding in holdings) if holdings else 0
    price_change = average_price - old_average
    percentage_change = (price_change / old_average) * 100 if old_average else 0
    
    return average_price, total_quantity, total_investment, price_change, percentage_change

@st.cache_data
def calculate_cagr(initial_investment, final_value, time_period_years):
    """Calculate Compound Annual Growth Rate"""
    if initial_investment <= 0 or time_period_years <= 0:
        return 0
    cagr = (final_value / initial_investment) ** (1 / time_period_years) - 1
    return cagr * 100  # Convert to percentage

@st.cache_data
def calculate_inflation_effect(current_amount, inflation_rate, years):
    """Calculate the effect of inflation on purchasing power"""
    inflation_rate = inflation_rate / 100
    future_value = current_amount / ((1 + inflation_rate) ** years)
    return future_value

@st.cache_data
def calculate_discount(original_price, discount_percentage):
    """Calculate discount amount and final price"""
    discount_amount = original_price * (discount_percentage / 100)
    final_price = original_price - discount_amount
    return discount_amount, final_price

@st.cache_data
def calculate_gst(base_amount, gst_rate):
    """Calculate GST amount and total price"""
    gst_amount = base_amount * (gst_rate / 100)
    total_amount = base_amount + gst_amount
    return gst_amount, total_amount

@st.cache_data
def calculate_gratuity(current_salary, years_of_service):
    """Calculate gratuity amount based on Indian labor laws"""
    # Gratuity formula: (15 * Last Drawn Salary * Years of Service) / 26
    # Where Last Drawn Salary typically includes basic + DA
    # For simplicity, we'll use monthly salary as the base
    
    # Gratuity is paid only if employee has served for 5 years or more
    if years_of_service < 5:
        return 0
    
    # Cap years of service at 20 for calculation purposes (though not a legal requirement)
    capped_service = min(years_of_service, 20)
    
    # Monthly salary is used for the calculation
    monthly_salary = current_salary
    
    # Gratuity calculation
    gratuity_amount = (15 * monthly_salary * capped_service) / 26
    
    return gratuity_amount

@st.cache_data
def calculate_hra_exemption(basic_salary, rent_paid, hra_received, metro_city=True):
    """Calculate HRA exemption for tax purposes in India"""
    # HRA exemption is the minimum of:
    # 1. Actual HRA received
    # 2. 50% of basic salary (for metro cities) or 40% (for non-metro)
    # 3. Rent paid - 10% of basic salary
    
    percent_of_basic = 0.5 if metro_city else 0.4
    exemption_1 = hra_received
    exemption_2 = basic_salary * percent_of_basic
    exemption_3 = max(0, rent_paid - (basic_salary * 0.1))
    
    # Minimum of the three
    hra_exemption = min(exemption_1, exemption_2, exemption_3)
    
    return hra_exemption, exemption_1, exemption_2, exemption_3

@st.cache_data
def calculate_loan_emi(principal, interest_rate, tenure_months):
    """Calculate Equated Monthly Installment for a loan"""
    monthly_rate = interest_rate / (12 * 100)  # Convert annual rate to monthly and percentage to decimal
    emi = principal * monthly_rate * ((1 + monthly_rate) ** tenure_months) / (((1 + monthly_rate) ** tenure_months) - 1)
    
    # Calculate amortization schedule
    balance = principal
    amortization_schedule = []
    total_interest = 0
    
    for month in range(1, tenure_months + 1):
        interest_payment = balance * monthly_rate
        principal_payment = emi - interest_payment
        balance = balance - principal_payment
        total_interest += interest_payment
        
        amortization_schedule.append({
            'month': month,
            'emi': emi,
            'principal': principal_payment,
            'interest': interest_payment,
            'balance': max(0, balance)
        })
    
    return emi, total_interest, principal + total_interest, amortization_schedule

@st.cache_data
def calculate_credit_card_emi(purchase_amount, interest_rate, tenure_months, processing_fee_percentage=0):
    """Calculate EMI for credit card purchases"""
    processing_fee = purchase_amount * (processing_fee_percentage / 100)
    loan_amount = purchase_amount + processing_fee
    
    monthly_rate = interest_rate / (12 * 100)
    emi = loan_amount * monthly_rate * ((1 + monthly_rate) ** tenure_months) / (((1 + monthly_rate) ** tenure_months) - 1)
    
    total_payment = emi * tenure_months
    total_interest = total_payment - loan_amount
    
    return emi, total_interest, total_payment, processing_fee

@st.cache_data
def calculate_ppf(annual_investment, interest_rate, years=15):
    """Calculate Public Provident Fund (PPF) returns"""
    balance = 0
    yearly_details = []
    
    for year in range(1, years + 1):
        opening_balance = balance
        interest = (opening_balance + annual_investment) * (interest_rate / 100)
        balance = opening_balance + annual_investment + interest
        
        yearly_details.append({
            'year': year,
            'opening_balance': opening_balance,
            'investment': annual_investment,
            'interest': interest,
            'closing_balance': balance
        })
    
    total_investment = annual_investment * years
    total_interest = balance - total_investment
    
    return balance, total_investment, total_interest, yearly_details

def show_post_office_fd_calculator():
    """Show the Post Office Fixed Deposit (FD) calculator interface"""
    st.header("Post Office Fixed Deposit Calculator 🏤")
    st.write("""
    Calculate returns on your Post Office Fixed Deposit investments with this comprehensive calculator.
    Post Office FDs offer competitive interest rates with the security of government backing.
    """)
    
    col1, col2 = st.columns(2)
    with col1:
        principal = st.number_input(
            "Principal Amount (₹)",
            min_value=1000,
            max_value=10000000,
            value=100000,
            step=1000,
            help="Minimum deposit amount is ₹1000 with no maximum limit"
        )
        
        # Post Office FD interest rates as of April 2025
        term_options = ["1 Year", "2 Years", "3 Years", "5 Years"]
        interest_rates = {
            "1 Year": 6.9,
            "2 Years": 7.0,
            "3 Years": 7.1,
            "5 Years": 7.5
        }
        
        selected_term = st.selectbox(
            "Term Period",
            options=term_options,
            index=0,
            help="Post Office FDs are available for 1, 2, 3, and 5 year terms"
        )
        
        interest_rate = interest_rates[selected_term]
        st.write(f"**Current Interest Rate:** {interest_rate}% p.a.")
        
        tenure_years = int(selected_term.split()[0])
    
    with col2:
        payout_options = ["On Maturity", "Quarterly Payout"]
        payout_option = st.selectbox(
            "Interest Payout Option",
            options=payout_options,
            index=0,
            help="Choose to receive interest quarterly or at maturity"
        )
        
        investor_category = st.radio(
            "Investor Category",
            options=["Regular", "Senior Citizen"],
            index=0,
            help="Senior citizens get 0.5% additional interest"
        )
        
        is_senior = investor_category == "Senior Citizen"
        
        tax_bracket = st.selectbox(
            "Your Income Tax Bracket (%)",
            options=[0, 5, 10, 15, 20, 30],
            index=3,  # Default to 15%
            help="Select your income tax slab to calculate after-tax returns"
        )
    
    if st.button("Calculate Post Office FD Returns", use_container_width=True):
        # Calculate Post Office FD returns
        maturity_amount, interest_earned, effective_rate, quarterly_interest, growth_details = calculate_post_office_fd(
            principal, interest_rate, tenure_years, is_senior
        )
        
        # Calculate after-tax returns
        tax_on_interest = interest_earned * (tax_bracket / 100)
        after_tax_returns = interest_earned - tax_on_interest
        after_tax_maturity = principal + after_tax_returns
        effective_after_tax_rate = ((after_tax_maturity / principal) ** (1/tenure_years) - 1) * 100
        
        # Display results
        st.subheader("📊 Post Office FD Results")
        
        col1, col2, col3 = st.columns(3)
        with col1:
            st.metric(
                "Principal Amount",
                f"₹{principal:,.2f}",
                help="Your initial investment in Post Office FD"
            )
        with col2:
            st.metric(
                "Effective Interest Rate",
                f"{effective_rate:.2f}%",
                f"+0.5%" if is_senior else None,
                help="Annual interest rate applicable to your deposit"
            )
        with col3:
            st.metric(
                "Total Interest Earned",
                f"₹{interest_earned:,.2f}",
                help="Total interest earned over the term period"
            )
        
        # Maturity details
        st.subheader("💰 Maturity Details")
        
        col1, col2, col3 = st.columns(3)
        with col1:
            st.metric(
                "Maturity Amount",
                f"₹{maturity_amount:,.2f}",
                help="The total amount you'll receive on maturity"
            )
        with col2:
            st.metric(
                "After-Tax Maturity",
                f"₹{after_tax_maturity:.2f}",
                help="Maturity amount after tax deduction"
            )
        with col3:
            st.metric(
                "After-Tax Returns",
                f"{effective_after_tax_rate:.2f}%",
                help="Effective annual returns after tax"
            )
        
        # If quarterly payout is selected, show additional details
        if payout_option == "Quarterly Payout":
            st.subheader("🔄 Quarterly Interest Payout")
            st.info(f"""
            - **Quarterly Interest Amount**: ₹{quarterly_interest:,.2f}
            - **Total Payouts**: {tenure_years * 4} quarters
            - **Total Interest Paid**: ₹{quarterly_interest * tenure_years * 4:,.2f}
            
            *Note: When opting for quarterly interest payout, the principal amount remains unchanged and is returned at maturity.*
            """)
        
        # Growth details visualization
        st.subheader("📈 Quarter-wise Growth")
        
        # Create a DataFrame for quarters
        quarter_data = []
        for detail in growth_details:
            quarter = detail['quarter']
            year = (quarter - 1) // 4 + 1
            quarter_in_year = (quarter - 1) % 4 + 1
            quarter_data.append({
                'Quarter': f"Y{year}Q{quarter_in_year}",
                'Quarter Number': quarter,
                'Opening Balance': detail['opening_balance'],
                'Interest': detail['interest'],
                'Closing Balance': detail['closing_balance']
            })
        
        quarter_df = pd.DataFrame(quarter_data)
        
        # Display a table with the quarterly details
        st.dataframe(
            quarter_df[['Quarter', 'Opening Balance', 'Interest', 'Closing Balance']].style.format({
                'Opening Balance': '₹{:,.2f}',
                'Interest': '₹{:,.2f}',
                'Closing Balance': '₹{:,.2f}'
            }),
            use_container_width=True
        )
        
        # Create visualization
        fig = px.line(
            quarter_df,
            x='Quarter',
            y='Closing Balance',
            title=f'Post Office FD Growth Over {tenure_years} Year{"s" if tenure_years > 1 else ""}',
            labels={'Closing Balance': 'Amount (₹)'}
        )
        
        # Add interest as a bar chart
        fig.add_bar(
            x=quarter_df['Quarter'],
            y=quarter_df['Interest'],
            name='Quarterly Interest',
            opacity=0.7
        )
        
        # Set y-axis to start from 0
        fig.update_layout(
            yaxis_range=[0, max(quarter_df['Closing Balance']) * 1.1],
            xaxis_tickmode='array',
            xaxis_tickvals=quarter_df['Quarter'][::max(1, len(quarter_df) // 10)]  # Show fewer x-axis labels
        )
        
        st.plotly_chart(fig, use_container_width=True)
        
        # Additional information and benefits
        st.subheader("💡 Key Features of Post Office Fixed Deposit")
        
        col1, col2 = st.columns(2)
        with col1:
            st.info("""
            ### Benefits
            - Government-backed security
            - Higher interest rates compared to many bank FDs
            - Senior citizens get additional 0.5% interest
            - Option for quarterly interest payout
            - TDS not applicable (but income is taxable)
            """)
        
        with col2:
            st.success("""
            ### Investment Features
            - Minimum investment: ₹1000
            - No maximum investment limit
            - Available tenures: 1, 2, 3, and 5 years
            - Premature withdrawal allowed with penalty
            - Nomination facility available
            - Available at post offices across India
            """)
        
        # Comparison with other fixed income investments
        st.subheader("🔄 Comparison with Other Fixed Income Investments")
        
        comparison_data = {
            'Investment Option': ['Post Office FD (5Y)', 'Bank FD (5Y)', 'NSC', 'PPF', 'Corporate FD (5Y)'],
            'Current Returns (%)': [7.5, '5.5-6.5', 7.7, 7.1, '7.0-9.0'],
            'Safety Level': ['Very High (Govt)', 'High (DICGC Coverage)', 'Very High (Govt)', 'Very High (Govt)', 'Moderate to High'],
            'Premature Withdrawal': ['Allowed with penalty', 'Allowed with penalty', 'Not allowed', 'Partial allowed after 6 years', 'Varies'],
            'Tax Benefits': ['No tax benefits', 'No tax benefits', 'Sec 80C for principal', 'Sec 80C & tax-free interest', 'No tax benefits']
        }
        
        comparison_df = pd.DataFrame(comparison_data)
        st.dataframe(comparison_df, use_container_width=True)
        
        # Tax implications
        with st.expander("📝 Taxation & Early Withdrawal"):
            st.write("""
            ### Tax Implications of Post Office FD
            
            1. **Interest Taxability**: Interest earned on Post Office FDs is fully taxable under "Income from Other Sources"
            2. **TDS**: No TDS is deducted at source, but you must declare interest in your Income Tax Return
            3. **Form 15G/15H**: Not applicable as Post Office doesn't deduct TDS
            
            ### Premature Withdrawal Rules
            
            1. **Before 6 months**: No interest is payable
            2. **After 6 months but before 1 year**: Interest at savings account rate (currently 4%)
            3. **After 1 year**: Interest at a rate applicable to the period completed minus 2%
            4. **Penalty**: 2% reduction in applicable interest rate for premature withdrawal
            
            *Note: Rules may change - check with your post office for the latest terms and conditions.*
            """)

def show_post_office_rd_calculator():
    """Show the Post Office Recurring Deposit (RD) calculator interface"""
    st.header("Post Office Recurring Deposit Calculator 🏤")
    st.write("""
    Calculate returns on your Post Office Recurring Deposit investments with this comprehensive calculator.
    Post Office RDs are a great way to build savings through regular monthly deposits with guaranteed interest rates.
    """)
    
    col1, col2 = st.columns(2)
    with col1:
        monthly_investment = st.number_input(
            "Monthly Deposit Amount (₹)",
            min_value=100,
            max_value=100000,
            value=5000,
            step=100,
            help="Minimum monthly deposit is ₹100 with multiples of ₹10 thereafter"
        )
        
        # Post Office RD interest rates as of April 2025
        term_options = ["1 Year", "2 Years", "3 Years", "5 Years"]
        interest_rates = {
            "1 Year": 6.8,
            "2 Years": 6.9,
            "3 Years": 7.0,
            "5 Years": 7.5
        }
        
        selected_term = st.selectbox(
            "Term Period",
            options=term_options,
            index=2,
            help="Post Office RDs are available for 1, 2, 3, and 5 year terms"
        )
        
        interest_rate = interest_rates[selected_term]
        st.write(f"**Current Interest Rate:** {interest_rate}% p.a.")
        
        tenure_years = int(selected_term.split()[0])
        tenure_months = tenure_years * 12
    
    with col2:
        investor_category = st.radio(
            "Investor Category",
            options=["Regular", "Senior Citizen"],
            index=0,
            help="Senior citizens get 0.5% additional interest"
        )
        
        is_senior = investor_category == "Senior Citizen"
        
        tax_bracket = st.selectbox(
            "Your Income Tax Bracket (%)",
            options=[0, 5, 10, 15, 20, 30],
            index=3,  # Default to 15%
            help="Select your income tax slab to calculate after-tax returns"
        )
        
        auto_renewal = st.checkbox(
            "Auto Renewal After Maturity",
            value=False,
            help="See how your investment grows if you auto-renew it for another term"
        )
    
    if st.button("Calculate Post Office RD Returns", use_container_width=True):
        # Calculate Post Office RD returns
        maturity_amount, total_investment, interest_earned, effective_rate, monthly_details = calculate_post_office_rd(
            monthly_investment, interest_rate, tenure_months, is_senior
        )
        
        # Calculate after-tax returns
        tax_on_interest = interest_earned * (tax_bracket / 100)
        after_tax_returns = interest_earned - tax_on_interest
        after_tax_maturity = total_investment + after_tax_returns
        effective_after_tax_rate = ((after_tax_maturity / total_investment) ** (1/tenure_years) - 1) * 100
        
        # Display results
        st.subheader("📊 Post Office RD Results")
        
        col1, col2, col3 = st.columns(3)
        with col1:
            st.metric(
                "Total Investment",
                f"₹{total_investment:,.2f}",
                help="Your total investment over the term period"
            )
        with col2:
            st.metric(
                "Effective Interest Rate",
                f"{effective_rate:.2f}%",
                f"+0.5%" if is_senior else None,
                help="Annual interest rate applicable to your deposits"
            )
        with col3:
            st.metric(
                "Total Interest Earned",
                f"₹{interest_earned:,.2f}",
                help="Total interest earned over the term period"
            )
        
        # Maturity details
        st.subheader("💰 Maturity Details")
        
        col1, col2, col3 = st.columns(3)
        with col1:
            st.metric(
                "Maturity Amount",
                f"₹{maturity_amount:,.2f}",
                help="The total amount you'll receive on maturity"
            )
        with col2:
            st.metric(
                "After-Tax Maturity",
                f"₹{after_tax_maturity:.2f}",
                help="Maturity amount after tax deduction"
            )
        with col3:
            st.metric(
                "After-Tax Returns",
                f"{effective_after_tax_rate:.2f}%",
                help="Effective annual returns after tax"
            )
        
        # Growth details visualization
        st.subheader("📈 Month-wise Growth")
        
        # Create a DataFrame for months
        month_df = pd.DataFrame(monthly_details)
        month_df['Month Label'] = month_df['month'].apply(lambda m: f"Month {m}")
        
        # Filter to show every 3 months for better clarity in large datasets
        step = max(1, len(month_df) // 20)  # Show max 20 points on the chart
        filtered_df = month_df.iloc[::step].copy()
        if len(month_df) - 1 not in filtered_df.index:  # Ensure last month is included
            filtered_df = pd.concat([filtered_df, month_df.iloc[[-1]]])
        
        # Display a table with the monthly details
        st.dataframe(
            month_df[['month', 'opening_balance', 'deposit', 'interest', 'closing_balance']].style.format({
                'opening_balance': '₹{:,.2f}',
                'deposit': '₹{:,.2f}',
                'interest': '₹{:,.2f}',
                'closing_balance': '₹{:,.2f}'
            }),
            use_container_width=True
        )
        
        # Create visualization
        fig = px.line(
            month_df,
            x='month',
            y='closing_balance',
            title=f'Post Office RD Growth Over {tenure_years} Year{"s" if tenure_years > 1 else ""}',
            labels={'closing_balance': 'Amount (₹)', 'month': 'Month'}
        )
        
        # Add interest as a bar chart
        fig.add_bar(
            x=month_df['month'],
            y=month_df['interest'],
            name='Monthly Interest',
            opacity=0.7
        )
        
        # Set y-axis to start from 0
        fig.update_layout(
            yaxis_range=[0, max(month_df['closing_balance']) * 1.1],
            xaxis_title="Month",
            yaxis_title="Amount (₹)"
        )
        
        st.plotly_chart(fig, use_container_width=True)
        
        # Auto renewal projection if selected
        if auto_renewal:
            st.subheader("🔄 Auto Renewal Projection")
            
            # Calculate one more term with the maturity amount as initial deposit
            renewed_monthly_investment = monthly_investment
            renewed_maturity_amount = maturity_amount
            renewed_total_investment = total_investment * 2  # Original + new deposits
            
            for i in range(1, tenure_years + 1):
                year_label = tenure_years + i
                renewed_interest = renewed_maturity_amount * (effective_rate / 100)
                renewed_maturity_amount += (renewed_monthly_investment * 12) + renewed_interest
            
            renewed_interest_earned = renewed_maturity_amount - renewed_total_investment
            
            st.info(f"""
            ### After Auto Renewal for Another {tenure_years} Years:
            
            - **Projected Maturity Amount**: ₹{renewed_maturity_amount:,.2f}
            - **Total Investment**: ₹{renewed_total_investment:,.2f}
            - **Total Interest Earned**: ₹{renewed_interest_earned:,.2f}
            - **Growth**: {(renewed_maturity_amount/maturity_amount - 1)*100:.2f}%
            
            *This is a simplified projection assuming constant interest rates and regular deposits.*
            """)
        
        # Additional information and benefits
        st.subheader("💡 Key Features of Post Office Recurring Deposit")
        
        col1, col2 = st.columns(2)
        with col1:
            st.info("""
            ### Benefits
            - Government-backed security
            - Competitive interest rates
            - Senior citizens get additional 0.5% interest
            - Low minimum deposit requirement
            - TDS not applicable (but income is taxable)
            - Helps build a disciplined savings habit
            """)
        
        with col2:
            st.success("""
            ### Investment Features
            - Minimum monthly deposit: ₹100 (in multiples of ₹10)
            - No maximum investment limit
            - Available tenures: 1, 2, 3, and 5 years
            - Nomination facility available
            - Default penalty for missed deposits
            - Available at post offices across India
            """)
        
        # Comparison with other recurring deposit investments
        st.subheader("🔄 Comparison with Other RD Options")
        
        comparison_data = {
            'Investment Option': ['Post Office RD (5Y)', 'Bank RD (5Y)', 'SIP in Debt Fund', 'Monthly SSY', 'Monthly PPF'],
            'Current Returns (%)': [7.5, '5.5-6.5', '6.0-8.0', 8.2, 7.1],
            'Safety Level': ['Very High (Govt)', 'High (DICGC Coverage)', 'Moderate', 'Very High (Govt)', 'Very High (Govt)'],
            'Liquidity': ['Low', 'Low', 'High', 'Very Low', 'Low'],
            'Tax Benefits': ['No tax benefits', 'No tax benefits', 'LTCG after 3 years', 'Sec 80C & tax-free interest', 'Sec 80C & tax-free interest']
        }
        
        comparison_df = pd.DataFrame(comparison_data)
        st.dataframe(comparison_df, use_container_width=True)
        
        # Tax implications
        with st.expander("📝 Taxation & Default Rules"):
            st.write("""
            ### Tax Implications of Post Office RD
            
            1. **Interest Taxability**: Interest earned on Post Office RDs is fully taxable under "Income from Other Sources"
            2. **TDS**: No TDS is deducted at source, but you must declare interest in your Income Tax Return
            3. **Form 15G/15H**: Not applicable as Post Office doesn't deduct TDS
            
            ### Default Rules for Missed Deposits
            
            1. **Default Fee**: ₹1 for every ₹100 per month
            2. **Regularization**: Account can be regularized by paying all missed installments with default fee
            3. **Maximum Defaults**: Any RD with more than 4 defaults cannot be continued
            4. **Discontinued Account**: Interest at post office savings account rate for accounts closed prematurely
            
            *Note: Rules may change - check with your post office for the latest terms and conditions.*
            """)

def show_kotak_fd_calculator():
    """Show the Kotak Mahindra Bank Fixed Deposit (FD) calculator interface"""
    st.header("Kotak Mahindra Bank Fixed Deposit Calculator 🏦")
    st.write("""
    Calculate returns on your Kotak Mahindra Bank fixed deposits with this comprehensive calculator.
    Compare different interest payout options and view detailed growth projections.
    """)
    st.warning("""
    **Disclaimer:** This calculator provides approximate values based on current Kotak Mahindra Bank FD rates.
    Actual returns may vary based on specific schemes and promotional offers.
    Please consult with a Kotak Mahindra Bank representative for the most current rates and terms.
    """)
    
    col1, col2 = st.columns(2)
    
    with col1:
        principal = st.number_input(
            "Principal Amount (₹)",
            min_value=5000,
            max_value=10000000,
            value=100000,
            step=5000,
            help="Minimum deposit amount is ₹5,000 for standard FDs"
        )
        
        tenure_options = [
            "7 days", "15 days", "30 days", "45 days", "90 days", "180 days", "270 days",
            "1 year", "1.5 years", "2 years", "3 years", "5 years", "10 years"
        ]
        
        tenure_selection = st.selectbox(
            "Select Tenure",
            tenure_options,
            index=7  # Default to 1 year
        )
        
        # Convert tenure selection to days
        tenure_days_map = {
            "7 days": 7,
            "15 days": 15,
            "30 days": 30,
            "45 days": 45,
            "90 days": 90,
            "180 days": 180,
            "270 days": 270,
            "1 year": 365,
            "1.5 years": 548,
            "2 years": 730,
            "3 years": 1095,
            "5 years": 1825,
            "10 years": 3650
        }
        
        tenure_days = tenure_days_map[tenure_selection]
        
        payout_frequency = st.selectbox(
            "Interest Payout Frequency",
            ["At Maturity", "Monthly", "Quarterly", "Half-Yearly", "Yearly"],
            help="How often you want to receive interest payments"
        )
        
        if payout_frequency != "At Maturity" and tenure_days < 180:
            st.error("Periodic payout options are only available for deposits of 180 days or more")
            payout_frequency = "At Maturity"
        
    with col2:
        # Current rates are approximate and can be adjusted
        default_rates = {
            "7 days": 4.50,
            "15 days": 4.75,
            "30 days": 5.00,
            "45 days": 5.25,
            "90 days": 5.50,
            "180 days": 5.75,
            "270 days": 5.90,
            "1 year": 6.25,
            "1.5 years": 6.40,
            "2 years": 6.50,
            "3 years": 6.60,
            "5 years": 6.50,
            "10 years": 6.25
        }
        
        interest_rate = st.number_input(
            "Interest Rate (%)",
            min_value=2.0,
            max_value=10.0,
            value=default_rates[tenure_selection],
            step=0.05,
            help="Current Kotak Mahindra Bank FD rates (you can adjust if needed)"
        )
        
        tax_bracket = st.selectbox(
            "Your Income Tax Bracket",
            ["No Tax", "5%", "10%", "15%", "20%", "30%"],
            help="Select your income tax slab to calculate post-tax returns"
        )
        
        tax_rate_map = {
            "No Tax": 0,
            "5%": 0.05,
            "10%": 0.10,
            "15%": 0.15,
            "20%": 0.20,
            "30%": 0.30
        }
        
        tax_rate = tax_rate_map[tax_bracket]
        
        st.markdown("### Special Features")
        
        special_features = st.multiselect(
            "Choose special features that apply",
            ["Senior Citizen", "NRE Account", "Digital FD Booking", "Tax-Saving FD (5 years)"],
            help="Special conditions that provide additional benefits"
        )
        
        senior_citizen = "Senior Citizen" in special_features
        nre_account = "NRE Account" in special_features
        digital_fd = "Digital FD Booking" in special_features
        tax_saving = "Tax-Saving FD (5 years)" in special_features
        
        if tax_saving and tenure_days != 1825:
            st.error("Tax-Saving FDs have a mandatory 5-year lock-in period. Tenure has been set to 5 years.")
            tenure_days = 1825
            tenure_selection = "5 years"
        
    # Display the calculator
    if st.button("Calculate FD Returns", use_container_width=True):
        # Calculate returns
        maturity_amount, interest_earned, effective_rate, periodic_payout, growth_details, tax_savings, nre_tax_benefit = calculate_kotak_fd(
            principal, interest_rate, tenure_days, payout_frequency, senior_citizen, tax_saving, nre_account, digital_fd
        )
        
        # Calculate post-tax returns
        tax_on_interest = 0
        if not nre_account:  # NRE accounts have tax-free interest
            tax_on_interest = interest_earned * tax_rate
        
        post_tax_interest = interest_earned - tax_on_interest
        post_tax_maturity = principal + post_tax_interest
        
        # Display results in three columns
        col1, col2, col3 = st.columns(3)
        
        with col1:
            st.metric(
                "Maturity Amount",
                f"₹{maturity_amount:,.2f}",
                f"+{interest_earned:,.2f}",
                help="Total amount you'll receive at maturity including principal"
            )
            
            if periodic_payout > 0:
                payout_labels = {
                    "Monthly": "per month",
                    "Quarterly": "per quarter",
                    "Half-Yearly": "per half-year",
                    "Yearly": "per year"
                }
                
                st.metric(
                    f"Interest Payout ({payout_labels[payout_frequency]})",
                    f"₹{periodic_payout:,.2f}",
                    help="Interest amount that will be paid out periodically"
                )
        
        with col2:
            st.metric(
                "Total Interest Earned",
                f"₹{interest_earned:,.2f}",
                help="Total interest earned over the entire deposit period"
            )
            
            st.metric(
                "Effective Interest Rate",
                f"{effective_rate:.2f}%",
                f"{effective_rate - interest_rate:.2f}%" if effective_rate != interest_rate else None,
                help="Actual rate including benefits for senior citizens or digital booking"
            )
        
        with col3:
            st.metric(
                "Post-Tax Maturity Value",
                f"₹{post_tax_maturity:,.2f}",
                help="Maturity amount after tax deduction"
            )
            
            if tax_rate > 0 and not nre_account:
                st.metric(
                    "Tax on Interest",
                    f"₹{tax_on_interest:,.2f}",
                    delta_color="inverse",
                    help="Tax amount deducted from interest as per your tax bracket"
                )
        
        # Display special benefits
        if tax_savings or nre_tax_benefit:
            st.subheader("💸 Tax Benefits")
            tax_col1, tax_col2 = st.columns(2)
            
            with tax_col1:
                if tax_savings:
                    st.metric(
                        "Section 80C Tax Benefit",
                        f"₹{tax_savings:,.2f}",
                        help="Tax amount saved by investing in tax-saving FD under Section 80C"
                    )
            
            with tax_col2:
                if nre_tax_benefit:
                    st.metric(
                        "NRE Account Tax Benefit",
                        f"₹{nre_tax_benefit:,.2f}",
                        help="Tax saved as interest earned on NRE deposits is tax-free"
                    )
        
        # Display growth details
        if len(growth_details) > 0:
            st.subheader("📈 Growth Projection")
            
            df = pd.DataFrame(growth_details)
            
            if payout_frequency == "At Maturity":
                # Create compound interest growth chart
                fig = px.line(
                    df, 
                    x='period', 
                    y='closing_balance',
                    labels={
                        'period': 'Period',
                        'closing_balance': 'Balance (₹)'
                    },
                    title=f'FD Growth Over {tenure_selection}'
                )
                
                # Add area under the curve
                fig.update_traces(fill='tozeroy', line=dict(color='green'))
                
                st.plotly_chart(fig, use_container_width=True)
                
                # Display principal vs interest component
                components_fig = go.Figure()
                
                components_fig.add_trace(go.Bar(
                    name='Principal',
                    x=['Deposit Components'],
                    y=[principal],
                    marker_color='blue'
                ))
                
                components_fig.add_trace(go.Bar(
                    name='Interest',
                    x=['Deposit Components'],
                    y=[interest_earned],
                    marker_color='green'
                ))
                
                components_fig.update_layout(
                    title='Principal vs Interest Component',
                    barmode='stack',
                    yaxis=dict(title='Amount (₹)')
                )
                
                st.plotly_chart(components_fig, use_container_width=True)
            else:
                # For periodic payout, show cumulative interest payouts
                cumulative_payouts = np.cumsum(df['payout'])
                df['cumulative_payouts'] = cumulative_payouts
                
                fig = px.line(
                    df,
                    x='period',
                    y='cumulative_payouts',
                    labels={
                        'period': 'Period',
                        'cumulative_payouts': 'Cumulative Interest Payouts (₹)'
                    },
                    title=f'Cumulative Interest Payouts Over {tenure_selection}'
                )
                
                # Add area under the curve
                fig.update_traces(fill='tozeroy', line=dict(color='green'))
                
                st.plotly_chart(fig, use_container_width=True)
        
        # Display detailed breakdown
        st.subheader("📋 Detailed Breakdown")
        
        details_table = []
        if payout_frequency == "At Maturity":
            # For non-periodic payouts, show yearly or quarterly breakdown
            group_size = 4 if len(growth_details) > 12 else 1
            
            for i in range(0, len(growth_details), group_size):
                end_idx = min(i + group_size, len(growth_details))
                period_group = growth_details[i:end_idx]
                
                # Calculate totals for the group
                total_interest = sum(item['interest'] for item in period_group)
                start_balance = period_group[0]['opening_balance']
                end_balance = period_group[-1]['closing_balance']
                
                period_text = f"Period {i//group_size + 1}"
                if group_size > 1:
                    period_text += f" ({i+1} to {end_idx})"
                
                details_table.append({
                    'Period': period_text,
                    'Opening Balance': start_balance,
                    'Interest Earned': total_interest,
                    'Closing Balance': end_balance
                })
        else:
            # For periodic payouts, group by year or half-year
            group_size = 12 if payout_frequency == "Monthly" else (
                4 if payout_frequency == "Quarterly" else (
                    2 if payout_frequency == "Half-Yearly" else 1
                )
            )
            
            for i in range(0, len(growth_details), group_size):
                end_idx = min(i + group_size, len(growth_details))
                period_group = growth_details[i:end_idx]
                
                # Calculate totals for the group
                total_interest = sum(item['interest'] for item in period_group)
                total_payout = sum(item['payout'] for item in period_group)
                
                year_num = (i // group_size) + 1
                period_text = f"Year {year_num}"
                
                details_table.append({
                    'Period': period_text,
                    'Principal Amount': principal,
                    'Interest Generated': total_interest,
                    'Interest Paid Out': total_payout
                })
        
        # Display the detailed table
        st.dataframe(
            pd.DataFrame(details_table).style.format({
                col: '₹{:,.2f}' for col in details_table[0].keys() if col != 'Period'
            }),
            use_container_width=True
        )
        
        # Additional information and insights
        st.subheader("💡 Key Insights")
        
        # Create columns for insights
        insight_col1, insight_col2 = st.columns(2)
        
        with insight_col1:
            st.info("""
            **Interest Calculation Details:**
            - Interest is calculated based on your selected payout frequency
            - 'At Maturity' option compounds interest for maximum returns
            - Periodic payout options provide regular income but lower final returns
            """)
            
            # Display digital FD benefits if selected
            if digital_fd:
                st.success("""
                **Digital FD Benefits:**
                - 0.1% additional interest for booking FD online
                - Convenient management through net banking
                - Paperless and eco-friendly process
                """)
        
        with insight_col2:
            # Display relevant info based on selected options
            if senior_citizen:
                st.success("""
                **Senior Citizen Benefits:**
                - 0.5% additional interest rate
                - Lower TDS threshold of ₹50,000 per year (vs ₹40,000 for others)
                - Option for monthly income schemes for regular cashflow
                """)
            
            if nre_account:
                st.success("""
                **NRE Account Benefits:**
                - Tax-free interest earnings in India
                - Both principal and interest freely repatriable
                - Protection from exchange rate fluctuations
                """)
                
            if tax_saving:
                st.success("""
                **Tax-Saving FD Benefits:**
                - Eligible for tax deduction under Section 80C up to ₹1,50,000
                - 5-year lock-in period with no premature withdrawal
                - TDS applicable but deduction reduces taxable income
                """)
        
        # Comparison with other banks
        st.subheader("🏦 How Kotak Mahindra Bank FD Compares")
        
        # Define approximate competitive rates for comparison
        comparison_data = {
            'Bank': ['Kotak Mahindra Bank', 'HDFC Bank', 'ICICI Bank', 'SBI', 'Axis Bank'],
            'Regular Rate (%)': [interest_rate, interest_rate - 0.1, interest_rate - 0.05, interest_rate - 0.2, interest_rate - 0.15],
            'Senior Citizen Rate (%)': [
                interest_rate + 0.5 if senior_citizen else interest_rate + 0.5, 
                interest_rate + 0.4, 
                interest_rate + 0.45, 
                interest_rate + 0.3, 
                interest_rate + 0.35
            ],
            'Unique Features': [
                'Digital FD bonus, Lower min. amount', 
                'Super Senior rates, Auto-renewal', 
                'Higher premature withdrawal rates', 
                'Widest branch network', 
                'Woman depositor special rates'
            ]
        }
        
        comparison_df = pd.DataFrame(comparison_data)
        
        # Highlight the current bank
        def highlight_kotak(s):
            is_kotak = s == 'Kotak Mahindra Bank'
            return ['background-color: #e6f7e6' if v else '' for v in is_kotak]
        
        st.dataframe(
            comparison_df.style.apply(highlight_kotak, axis=1).format({
                'Regular Rate (%)': '{:.2f}%',
                'Senior Citizen Rate (%)': '{:.2f}%'
            }),
            use_container_width=True
        )
        
        # Additional recommendations
        st.subheader("💰 Recommendations Based on Your FD Profile")
        
        # Provide tailored recommendations based on user's selections
        if tenure_days < 90:
            st.warning("""
            **Short-term FD Strategy:**
            - Consider liquid funds or ultra-short duration funds for better returns in short term
            - Opt for auto-renewal to avoid reinvestment hassles
            - Explore sweep-in FD option for better liquidity
            """)
        elif tenure_days >= 90 and tenure_days < 365:
            st.info("""
            **Medium-term FD Strategy:**
            - Balance between liquidity and returns is optimal
            - Consider laddering multiple FDs for better liquidity
            - Compare with corporate FDs for potentially higher returns
            """)
        else:
            st.success("""
            **Long-term FD Strategy:**
            - Consider tax-saving FDs if you haven't exhausted 80C limit
            - Split between FD and debt mutual funds for tax efficiency
            - Explore Senior Citizen Savings Scheme if applicable (higher returns)
            """)
        
        # Show premature withdrawal impact if relevant
        if tenure_days > 90:
            st.subheader("⚠️ Premature Withdrawal Impact")
            
            premature_penalty = 1.0  # Typically 1% penalty on the applicable rate
            
            st.warning(f"""
            If you withdraw before maturity (current selection: {tenure_selection}):
            - Penalty of approximately {premature_penalty}% on the applicable interest rate
            - For your deposit, this could mean approximately ₹{interest_earned * (premature_penalty/100):,.2f} less in returns
            - Consider the ladder strategy (multiple FDs with different tenures) for better liquidity planning
            """)

def show_axis_fd_calculator():
    """Show the Axis Bank Fixed Deposit (FD) calculator interface"""
    st.header("Axis Bank Fixed Deposit Calculator 🏦")
    st.write("""
    Calculate returns on your Axis Bank Fixed Deposit investments with this comprehensive calculator.
    Compare different payout frequencies, special citizen rates, and explore additional features like women depositor benefits.
    """)
    
    col1, col2 = st.columns(2)
    with col1:
        principal = st.number_input(
            "Principal Amount (₹)",
            min_value=5000,
            max_value=50000000,
            value=100000,
            step=5000,
            help="Minimum FD amount is ₹5,000"
        )
        
        # Axis Bank FD interest rates as of April 2025 (simplified)
        term_options = [
            "7-14 days", "15-29 days", "30-45 days", "46-60 days", 
            "61-90 days", "91-179 days", "180-364 days", "365-375 days",
            "376-539 days", "540-700 days", "701-800 days", "801-899 days", "900-999 days", "1000+ days"
        ]
        interest_rates = {
            "7-14 days": 3.0,
            "15-29 days": 3.0,
            "30-45 days": 3.5,
            "46-60 days": 4.25,
            "61-90 days": 4.5,
            "91-179 days": 4.75,
            "180-364 days": 5.5,
            "365-375 days": 6.0,
            "376-539 days": 6.0,
            "540-700 days": 6.25,
            "701-800 days": 6.5,
            "801-899 days": 6.7,
            "900-999 days": 6.75,
            "1000+ days": 6.9
        }
        
        selected_term = st.selectbox(
            "Term Period",
            options=term_options,
            index=7,  # Default to 365-375 days
            help="Select tenure period for your FD"
        )
        
        # Convert selected term to days for calculation
        term_days_map = {
            "7-14 days": 10,
            "15-29 days": 22,
            "30-45 days": 38,
            "46-60 days": 53,
            "61-90 days": 75,
            "91-179 days": 135,
            "180-364 days": 270,
            "365-375 days": 370,
            "376-539 days": 450,
            "540-700 days": 600,
            "701-800 days": 750,
            "801-899 days": 850,
            "900-999 days": 950,
            "1000+ days": 1100
        }
        tenure_days = term_days_map[selected_term]
        
        interest_rate = interest_rates[selected_term]
        st.write(f"**Current Interest Rate:** {interest_rate}% p.a.")
        
        # Loyalty bonus for existing customers
        is_existing_customer = st.checkbox(
            "I am an existing Axis Bank customer",
            help="Existing customers may be eligible for renewal benefits"
        )
        
        payout_frequency = st.selectbox(
            "Interest Payout Frequency",
            options=["At Maturity", "Monthly", "Quarterly", "Half-Yearly", "Yearly"],
            index=0,
            help="Select how you want to receive interest payouts"
        )
    
    with col2:
        account_type = st.radio(
            "Account Type",
            options=["Regular", "NRE (Non-Resident External)"],
            index=0,
            help="NRE accounts offer tax benefits for Non-Resident Indians"
        )
        
        is_nre = account_type == "NRE (Non-Resident External)"
        
        depositor_category = st.radio(
            "Depositor Category",
            options=["Regular", "Senior Citizen (60+)", "Woman Depositor", "Bank Staff"],
            index=0,
            help="Special categories receive beneficial interest rates"
        )
        
        is_senior = depositor_category == "Senior Citizen (60+)"
        is_woman = depositor_category == "Woman Depositor"
        is_staff = depositor_category == "Bank Staff"
        
        fd_type = st.radio(
            "FD Type",
            options=["Regular FD", "Tax-Saving FD (5 years)"],
            index=0,
            help="Tax-saving FDs have 5-year lock-in but offer 80C tax benefits"
        )
        
        is_tax_saving = fd_type == "Tax-Saving FD (5 years)"
        
        # Force 5-year term for tax-saving FDs
        if is_tax_saving:
            tenure_days = 1825  # 5 years
            interest_rate = interest_rates["1000+ days"]
            st.info("Tax-saving FDs have a mandatory 5-year lock-in period")
            
        tax_bracket = st.selectbox(
            "Your Income Tax Bracket (%)",
            options=[0, 5, 10, 15, 20, 30],
            index=3,  # Default to 15%
            help="Select your income tax slab to calculate after-tax returns"
        )
        
        # NRE accounts have tax-free interest
        if is_nre:
            st.success("Interest earned on NRE deposits is tax-free in India")
            tax_bracket = 0
    
    if st.button("Calculate Axis Bank FD Returns", use_container_width=True):
        # Calculate FD returns
        maturity_amount, interest_earned, effective_rate, periodic_payout, growth_details, tax_savings, nre_tax_benefit, loyalty_bonus, loyalty_bonus_text = calculate_axis_fd(
            principal, interest_rate, tenure_days, payout_frequency, is_senior, is_tax_saving, is_nre, is_woman, is_staff
        )
        
        # Apply loyalty bonus for existing customers if applicable
        if is_existing_customer and tenure_days >= 365:
            # Add a small loyalty bonus (0.1%) for renewals with tenure >= 1 year
            loyalty_bonus_rate = 0.1
            loyalty_bonus = principal * (loyalty_bonus_rate / 100) * (tenure_days / 365.25)
            loyalty_bonus_text = f"Loyalty Bonus: ₹{loyalty_bonus:,.2f} (0.1% p.a. for existing customers)"
            maturity_amount += loyalty_bonus
            interest_earned += loyalty_bonus
        
        # Calculate after-tax returns (0% for NRE accounts)
        tax_on_interest = interest_earned * (tax_bracket / 100)
        after_tax_returns = interest_earned - tax_on_interest
        after_tax_maturity = principal + after_tax_returns
        
        tenure_years = tenure_days / 365.25
        effective_after_tax_rate = ((after_tax_maturity / principal) ** (1/tenure_years) - 1) * 100
        
        # Display results
        st.subheader("📊 Axis Bank FD Results")
        
        col1, col2, col3 = st.columns(3)
        with col1:
            st.metric(
                "Principal Amount",
                f"₹{principal:,.2f}",
                help="Your initial investment"
            )
        with col2:
            # Calculate and display appropriate rate delta
            rate_delta = None
            if is_staff:
                rate_delta = "+1.0%"
            elif is_senior:
                rate_delta = "+0.5%"
            elif is_woman:
                rate_delta = "+0.1%"
                
            st.metric(
                "Effective Interest Rate",
                f"{effective_rate:.2f}%",
                rate_delta,
                help="Annual interest rate applicable to your deposit"
            )
        with col3:
            st.metric(
                "Interest Earned",
                f"₹{interest_earned:,.2f}",
                help="Total interest earned over the term period"
            )
        
        # Maturity details
        st.subheader("💰 Maturity Details")
        
        col1, col2, col3 = st.columns(3)
        with col1:
            st.metric(
                "Maturity Amount",
                f"₹{maturity_amount:,.2f}",
                help="Total amount at maturity"
            )
        with col2:
            st.metric(
                "After-Tax Maturity",
                f"₹{after_tax_maturity:.2f}",
                help="Maturity amount after tax deduction"
            )
        with col3:
            st.metric(
                "After-Tax Returns",
                f"{effective_after_tax_rate:.2f}%",
                help="Effective annual returns after tax"
            )
        
        # Display loyalty bonus for existing customers
        if is_existing_customer and loyalty_bonus > 0:
            st.success(loyalty_bonus_text)
        
        # Payout details if applicable
        if payout_frequency != "At Maturity" and periodic_payout > 0:
            st.subheader("💸 Regular Payout Details")
            
            payout_frequency_text = {
                "Monthly": "Monthly",
                "Quarterly": "Quarterly",
                "Half-Yearly": "Half-yearly",
                "Yearly": "Yearly"
            }[payout_frequency]
            
            # Calculate after-tax payout
            after_tax_payout = periodic_payout * (1 - tax_bracket / 100)
            
            col1, col2 = st.columns(2)
            with col1:
                st.metric(
                    f"{payout_frequency_text} Interest Payout",
                    f"₹{periodic_payout:,.2f}",
                    help=f"Interest payout every {payout_frequency.lower()} before tax"
                )
            with col2:
                st.metric(
                    f"After-Tax {payout_frequency_text} Payout",
                    f"₹{after_tax_payout:.2f}",
                    help=f"Interest payout after tax deduction"
                )
                
            # Show yearly summary for payouts
            if payout_frequency != "Yearly":
                yearly_payout_map = {
                    "Monthly": 12,
                    "Quarterly": 4,
                    "Half-Yearly": 2
                }
                
                yearly_payout = periodic_payout * yearly_payout_map[payout_frequency]
                after_tax_yearly = after_tax_payout * yearly_payout_map[payout_frequency]
                
                st.info(f"""
                ### Yearly Payout Summary
                - **Yearly Interest Income**: ₹{yearly_payout:,.2f}
                - **After-Tax Yearly Income**: ₹{after_tax_yearly:,.2f}
                - **Monthly Average**: ₹{yearly_payout/12:,.2f} (pre-tax) / ₹{after_tax_yearly/12:,.2f} (after-tax)
                """)
        
        # NRE account tax benefit if applicable
        if is_nre and nre_tax_benefit:
            st.success(f"""
            ### 💹 NRE Account Tax Benefits
            
            As an NRI with an NRE account, your interest income is exempt from tax in India. 
            
            - **Estimated Tax Savings**: ₹{nre_tax_benefit:,.2f} (compared to a regular resident account in 30% tax bracket)
            - **Tax-Free Interest**: The entire ₹{interest_earned:,.2f} interest amount is tax-free in India
            
            **Note**: While interest income on NRE deposits is tax-free in India, it may be taxable in your country of residence.
            """)
        
        # Growth details visualization
        st.subheader("📈 Growth Visualization")
        
        # Create a DataFrame for periods
        df = pd.DataFrame(growth_details)
        
        # Create period labels
        period_type_text = df['period_type'].iloc[0] if not df.empty else "month"
        df['period_label'] = df['period'].apply(lambda p: f"Period {p} ({period_type_text})")
        
        # Filter for better visualization in large datasets
        max_points = 20
        step = max(1, len(df) // max_points)
        filtered_df = df.iloc[::step].copy()
        
        if len(df) - 1 not in filtered_df.index and len(df) > 0:  # Ensure last period is included
            filtered_df = pd.concat([filtered_df, df.iloc[[-1]]])
        
        # Display growth details
        if payout_frequency == "At Maturity":
            # For lump sum at maturity - show compound growth
            fig = px.line(
                df,
                x='period',
                y='closing_balance',
                title=f'Axis Bank FD Growth Over {tenure_days} Days',
                labels={'closing_balance': 'Amount (₹)', 'period': 'Period'}
            )
            
            # Add interest as a bar chart
            fig.add_bar(
                x=df['period'],
                y=df['interest'],
                name='Interest',
                opacity=0.7
            )
            
            st.plotly_chart(fig, use_container_width=True)
            
            # Display a table with growth details
            st.dataframe(
                df[['period', 'opening_balance', 'interest', 'closing_balance']].style.format({
                    'opening_balance': '₹{:,.2f}',
                    'interest': '₹{:,.2f}',
                    'closing_balance': '₹{:,.2f}'
                }),
                use_container_width=True
            )
        else:
            # For periodic payouts - show regular income
            fig1 = px.bar(
                filtered_df,
                x='period',
                y='payout',
                title=f'{payout_frequency} Payout from Axis Bank FD',
                labels={'payout': 'Payout Amount (₹)', 'period': 'Period'}
            )
            
            st.plotly_chart(fig1, use_container_width=True)
            
            # Calculate cumulative payouts
            df['cumulative_payout'] = df['payout'].cumsum()
            
            # Visualization of cumulative income
            fig2 = px.line(
                df,
                x='period',
                y='cumulative_payout',
                title='Cumulative Interest Income Over Time',
                labels={'cumulative_payout': 'Cumulative Payout (₹)', 'period': 'Period'}
            )
            
            st.plotly_chart(fig2, use_container_width=True)
            
            # Display a table with payout details
            st.dataframe(
                df[['period', 'interest', 'payout', 'cumulative_payout']].style.format({
                    'interest': '₹{:,.2f}',
                    'payout': '₹{:,.2f}',
                    'cumulative_payout': '₹{:,.2f}'
                }),
                use_container_width=True
            )
        
        # Tax benefits for tax-saving FD
        if is_tax_saving and tax_savings:
            st.subheader("💹 Tax Benefits")
            
            st.success(f"""
            ### Section 80C Tax Benefits
            
            Your tax-saving FD investment of ₹{min(principal, 150000):,.2f} qualifies for deduction under Section 80C.
            
            - **Maximum Eligible Amount**: ₹1,50,000 per financial year
            - **Your Eligible Deduction**: ₹{min(principal, 150000):,.2f}
            - **Estimated Tax Savings**: ₹{tax_savings:,.2f} (based on 30% tax bracket)
            - **Effective Return**: {effective_rate:.2f}% + tax benefits
            
            **Note**: Tax benefits are subject to your overall 80C limits and income tax rules.
            """)
        
        # Special category benefits explanation
        if is_woman or is_senior or is_staff:
            st.subheader("🌟 Special Category Benefits")
            
            if is_staff:
                st.success("""
                ### Axis Bank Staff Benefits
                
                As an Axis Bank staff member, you receive a 1% additional interest rate on your fixed deposit.
                
                **Benefits Applied**:
                - Additional 1.0% interest rate on your FD
                - Priority customer service
                - Digital banking benefits
                
                **Note**: Staff benefits are subject to the bank's HR policies and may change.
                """)
            elif is_senior:
                st.success("""
                ### Senior Citizen Benefits
                
                As a senior citizen (age 60+), you're eligible for preferential interest rates on your fixed deposit.
                
                **Benefits Applied**:
                - Additional 0.5% interest rate on your FD
                - Special service at branches
                - Doorstep banking facilities
                
                **Note**: Submit age proof to ensure senior citizen rates are applied.
                """)
            elif is_woman:
                st.success("""
                ### Woman Depositor Benefits
                
                As a woman depositor, you receive a special interest rate benefit on select deposits.
                
                **Benefits Applied**:
                - Additional 0.1% interest rate on your FD
                - Access to specialized banking programs for women
                
                **Note**: This rate is part of Axis Bank's financial inclusion initiatives.
                """)
        
        # Axis Bank FD features and comparison
        col1, col2 = st.columns(2)
        with col1:
            st.info("""
            ### Axis Bank FD Features
            - Flexible tenure options from 7 days to 10 years
            - Multiple payout options (monthly, quarterly, etc.)
            - Auto-renewal and sweep-in facilities
            - Digital FD opening through mobile/net banking
            - Overdraft facility against FD
            - Premature withdrawal option
            - FD opening through any branch nationwide
            - Special FD options for NRIs (NRE/NRO)
            """)
        
        with col2:
            st.success("""
            ### Axis Bank FD Benefits
            - Competitive interest rates
            - Special rates for senior citizens and women
            - Hassle-free digital experience
            - Tax benefits on tax-saver FDs
            - Auto-renewal option for convenience
            - Loan facility against deposit
            - Digital maturity instructions
            - Flexibility in payout frequency
            """)
        
        # Comparison with other FD options
        st.subheader("🔄 Comparison with Other FD Options")
        
        comparison_data = {
            'Bank/Institution': ['Axis Bank', 'ICICI Bank', 'HDFC Bank', 'SBI', 'Post Office', 'Small Finance Banks'],
            'Interest Rate Range (%)': [f'{interest_rate-0.3}-{interest_rate+0.3}', '5.5-7.0', '5.75-7.25', '5.75-7.0', '6.9-7.5', '7.0-9.0'],
            'Min. Investment': ['₹5,000', '₹10,000', '₹5,000', '₹1,000', '₹1,000', '₹1,000'],
            'Special Categories': ['Senior, Women, Staff', 'Senior', 'Senior, Super Senior', 'Senior', 'Senior', 'Senior'],
            'Safety Level': ['Very High', 'Very High', 'Very High', 'Very High', 'Very High (Govt)', 'High']
        }
        
        comparison_df = pd.DataFrame(comparison_data)
        st.dataframe(comparison_df, use_container_width=True)
        
        # Premature withdrawal information
        with st.expander("💰 Premature Withdrawal Rules"):
            st.write("""
            ### Axis Bank FD Premature Withdrawal Rules
            
            1. **Penalty**: 
               - For FDs below ₹5 lakhs: 0.5% to 1% lower rate than the applicable rate for the actual period
               - For FDs above ₹5 lakhs: Negotiable rates depending on market conditions
            
            2. **Tax-Saving FD**:
               - Premature withdrawal not allowed before 5 years
               - Exceptions in case of depositor's death
            
            3. **Partial Withdrawal**:
               - Available for certain FD types
               - Minimum of ₹5,000 needs to remain in the FD
            
            4. **Digital Withdrawal**:
               - Available through Axis Bank mobile/net banking
               - Instant credit to linked savings account
            
            5. **Loan Against FD**:
               - Alternative to premature withdrawal
               - Up to 90% of FD value
               - Interest rate: 2% higher than FD rate
            
            **Process**:
            - Visit your Axis Bank branch or use digital channels
            - Submit the FD receipt or use online authentication
            - Funds typically credited within 1 working day
            """)
        
        # Digital banking integration
        with st.expander("📱 Digital Banking Features"):
            st.write("""
            ### Axis Bank Digital Banking Integration for FD
            
            **Mobile & Internet Banking Features**:
            - Book new FDs instantly
            - View all your active FDs in one place
            - Set maturity instructions digitally
            - Auto-renewal options
            - Premature withdrawal facility
            - FD interest calculator
            - Statement downloads and e-receipts
            - Real-time alerts and notifications
            
            **WhatsApp Banking**:
            - Check FD details via WhatsApp
            - Receive maturity alerts
            - Request statements
            
            **AxisOne Super App**:
            - Integrated view of all your Axis Bank products
            - Quick FD booking process
            - Comparative view of different FD options
            - Personalized offers and best rate suggestions
            - Goal-based FD recommendations
            
            **Digital Innovations**:
            - Voice-enabled FD services
            - Biometric authentication for security
            - Paperless KYC process
            - Digital nomination facility
            """)

def show_icici_fd_calculator():
    """Show the ICICI Bank Fixed Deposit (FD) calculator interface"""
    st.header("ICICI Bank Fixed Deposit Calculator 🏦")
    st.write("""
    Calculate returns on your ICICI Bank Fixed Deposit investments with this comprehensive calculator.
    Compare different payout frequencies, special citizen rates, NRE account benefits, and tax implications.
    """)
    
    col1, col2 = st.columns(2)
    with col1:
        principal = st.number_input(
            "Principal Amount (₹)",
            min_value=10000,
            max_value=50000000,
            value=100000,
            step=10000,
            help="Minimum FD amount is ₹10,000"
        )
        
        # ICICI FD interest rates as of April 2025 (simplified)
        term_options = [
            "7-14 days", "15-29 days", "30-45 days", "46-60 days", 
            "61-90 days", "91-120 days", "121-180 days", "181-270 days",
            "271-365 days", "366-2 years", "2-3 years", "3-5 years", "5-10 years"
        ]
        interest_rates = {
            "7-14 days": 3.0,
            "15-29 days": 3.0,
            "30-45 days": 3.5,
            "46-60 days": 4.25,
            "61-90 days": 4.5,
            "91-120 days": 4.75,
            "121-180 days": 5.0,
            "181-270 days": 5.5,
            "271-365 days": 5.75,
            "366-2 years": 6.25,
            "2-3 years": 6.5,
            "3-5 years": 6.7,
            "5-10 years": 6.9
        }
        
        selected_term = st.selectbox(
            "Term Period",
            options=term_options,
            index=9,  # Default to 366-2 years
            help="Select tenure period for your FD"
        )
        
        # Convert selected term to days for calculation
        term_days_map = {
            "7-14 days": 10,
            "15-29 days": 22,
            "30-45 days": 38,
            "46-60 days": 53,
            "61-90 days": 75,
            "91-120 days": 105,
            "121-180 days": 150,
            "181-270 days": 225,
            "271-365 days": 340,
            "366-2 years": 545,  # ~1.5 years in days
            "2-3 years": 912,    # ~2.5 years in days
            "3-5 years": 1460,   # ~4 years in days
            "5-10 years": 2555   # ~7 years in days
        }
        tenure_days = term_days_map[selected_term]
        
        interest_rate = interest_rates[selected_term]
        st.write(f"**Current Interest Rate:** {interest_rate}% p.a.")
        
        payout_frequency = st.selectbox(
            "Interest Payout Frequency",
            options=["At Maturity", "Monthly", "Quarterly", "Half-Yearly", "Yearly"],
            index=0,
            help="Select how you want to receive interest payouts"
        )
    
    with col2:
        account_type = st.radio(
            "Account Type",
            options=["Regular", "NRE (Non-Resident External)"],
            index=0,
            help="NRE accounts offer tax benefits for Non-Resident Indians"
        )
        
        is_nre = account_type == "NRE (Non-Resident External)"
        
        investor_type = st.radio(
            "Investor Category",
            options=["Regular", "Senior Citizen (60+)"],
            index=0,
            help="Senior citizens get 0.5% additional interest"
        )
        
        is_senior = investor_type == "Senior Citizen (60+)"
        
        fd_type = st.radio(
            "FD Type",
            options=["Regular FD", "Tax-Saving FD (5 years)"],
            index=0,
            help="Tax-saving FDs have 5-year lock-in but offer 80C tax benefits"
        )
        
        is_tax_saving = fd_type == "Tax-Saving FD (5 years)"
        
        # Force 5-year term for tax-saving FDs
        if is_tax_saving:
            tenure_days = 1825  # 5 years
            interest_rate = interest_rates["3-5 years"]
            st.info("Tax-saving FDs have a mandatory 5-year lock-in period")
            
        tax_bracket = st.selectbox(
            "Your Income Tax Bracket (%)",
            options=[0, 5, 10, 15, 20, 30],
            index=3,  # Default to 15%
            help="Select your income tax slab to calculate after-tax returns"
        )
        
        # NRE accounts have tax-free interest
        if is_nre:
            st.success("Interest earned on NRE deposits is tax-free in India")
            tax_bracket = 0
    
    if st.button("Calculate ICICI FD Returns", use_container_width=True):
        # Calculate FD returns
        maturity_amount, interest_earned, effective_rate, periodic_payout, growth_details, tax_savings, nre_tax_benefit = calculate_icici_fd(
            principal, interest_rate, tenure_days, payout_frequency, is_senior, is_tax_saving, is_nre
        )
        
        # Calculate after-tax returns (0% for NRE accounts)
        tax_on_interest = interest_earned * (tax_bracket / 100)
        after_tax_returns = interest_earned - tax_on_interest
        after_tax_maturity = principal + after_tax_returns
        
        tenure_years = tenure_days / 365.25
        effective_after_tax_rate = ((after_tax_maturity / principal) ** (1/tenure_years) - 1) * 100
        
        # Display results
        st.subheader("📊 ICICI FD Results")
        
        col1, col2, col3 = st.columns(3)
        with col1:
            st.metric(
                "Principal Amount",
                f"₹{principal:,.2f}",
                help="Your initial investment"
            )
        with col2:
            rate_delta = "+0.5%" if is_senior else None
            st.metric(
                "Effective Interest Rate",
                f"{effective_rate:.2f}%",
                rate_delta,
                help="Annual interest rate applicable to your deposit"
            )
        with col3:
            st.metric(
                "Interest Earned",
                f"₹{interest_earned:,.2f}",
                help="Total interest earned over the term period"
            )
        
        # Maturity details
        st.subheader("💰 Maturity Details")
        
        col1, col2, col3 = st.columns(3)
        with col1:
            st.metric(
                "Maturity Amount",
                f"₹{maturity_amount:,.2f}",
                help="Total amount at maturity"
            )
        with col2:
            st.metric(
                "After-Tax Maturity",
                f"₹{after_tax_maturity:.2f}",
                help="Maturity amount after tax deduction"
            )
        with col3:
            st.metric(
                "After-Tax Returns",
                f"{effective_after_tax_rate:.2f}%",
                help="Effective annual returns after tax"
            )
        
        # Payout details if applicable
        if payout_frequency != "At Maturity" and periodic_payout > 0:
            st.subheader("💸 Regular Payout Details")
            
            payout_frequency_text = {
                "Monthly": "Monthly",
                "Quarterly": "Quarterly",
                "Half-Yearly": "Half-yearly",
                "Yearly": "Yearly"
            }[payout_frequency]
            
            # Calculate after-tax payout
            after_tax_payout = periodic_payout * (1 - tax_bracket / 100)
            
            col1, col2 = st.columns(2)
            with col1:
                st.metric(
                    f"{payout_frequency_text} Interest Payout",
                    f"₹{periodic_payout:,.2f}",
                    help=f"Interest payout every {payout_frequency.lower()} before tax"
                )
            with col2:
                st.metric(
                    f"After-Tax {payout_frequency_text} Payout",
                    f"₹{after_tax_payout:.2f}",
                    help=f"Interest payout after tax deduction"
                )
                
            # Show yearly summary for payouts
            if payout_frequency != "Yearly":
                yearly_payout_map = {
                    "Monthly": 12,
                    "Quarterly": 4,
                    "Half-Yearly": 2
                }
                
                yearly_payout = periodic_payout * yearly_payout_map[payout_frequency]
                after_tax_yearly = after_tax_payout * yearly_payout_map[payout_frequency]
                
                st.info(f"""
                ### Yearly Payout Summary
                - **Yearly Interest Income**: ₹{yearly_payout:,.2f}
                - **After-Tax Yearly Income**: ₹{after_tax_yearly:,.2f}
                - **Monthly Average**: ₹{yearly_payout/12:,.2f} (pre-tax) / ₹{after_tax_yearly/12:,.2f} (after-tax)
                """)
        
        # NRE account tax benefit if applicable
        if is_nre and nre_tax_benefit:
            st.success(f"""
            ### 💹 NRE Account Tax Benefits
            
            As an NRI with an NRE account, your interest income is exempt from tax in India. 
            
            - **Estimated Tax Savings**: ₹{nre_tax_benefit:,.2f} (compared to a regular resident account in 30% tax bracket)
            - **Tax-Free Interest**: The entire ₹{interest_earned:,.2f} interest amount is tax-free in India
            
            **Note**: While interest income on NRE deposits is tax-free in India, it may be taxable in your country of residence.
            """)
        
        # Growth details visualization
        st.subheader("📈 Growth Visualization")
        
        # Create a DataFrame for periods
        df = pd.DataFrame(growth_details)
        
        # Create period labels
        period_type_text = df['period_type'].iloc[0] if not df.empty else "month"
        df['period_label'] = df['period'].apply(lambda p: f"Period {p} ({period_type_text})")
        
        # Filter for better visualization in large datasets
        max_points = 20
        step = max(1, len(df) // max_points)
        filtered_df = df.iloc[::step].copy()
        
        if len(df) - 1 not in filtered_df.index and len(df) > 0:  # Ensure last period is included
            filtered_df = pd.concat([filtered_df, df.iloc[[-1]]])
        
        # Display growth details
        if payout_frequency == "At Maturity":
            # For lump sum at maturity - show compound growth
            fig = px.line(
                df,
                x='period',
                y='closing_balance',
                title=f'ICICI FD Growth Over {tenure_days} Days',
                labels={'closing_balance': 'Amount (₹)', 'period': 'Period'}
            )
            
            # Add interest as a bar chart
            fig.add_bar(
                x=df['period'],
                y=df['interest'],
                name='Interest',
                opacity=0.7
            )
            
            st.plotly_chart(fig, use_container_width=True)
            
            # Display a table with growth details
            st.dataframe(
                df[['period', 'opening_balance', 'interest', 'closing_balance']].style.format({
                    'opening_balance': '₹{:,.2f}',
                    'interest': '₹{:,.2f}',
                    'closing_balance': '₹{:,.2f}'
                }),
                use_container_width=True
            )
        else:
            # For periodic payouts - show regular income
            fig1 = px.bar(
                filtered_df,
                x='period',
                y='payout',
                title=f'{payout_frequency} Payout from ICICI FD',
                labels={'payout': 'Payout Amount (₹)', 'period': 'Period'}
            )
            
            st.plotly_chart(fig1, use_container_width=True)
            
            # Calculate cumulative payouts
            df['cumulative_payout'] = df['payout'].cumsum()
            
            # Visualization of cumulative income
            fig2 = px.line(
                df,
                x='period',
                y='cumulative_payout',
                title='Cumulative Interest Income Over Time',
                labels={'cumulative_payout': 'Cumulative Payout (₹)', 'period': 'Period'}
            )
            
            st.plotly_chart(fig2, use_container_width=True)
            
            # Display a table with payout details
            st.dataframe(
                df[['period', 'interest', 'payout', 'cumulative_payout']].style.format({
                    'interest': '₹{:,.2f}',
                    'payout': '₹{:,.2f}',
                    'cumulative_payout': '₹{:,.2f}'
                }),
                use_container_width=True
            )
        
        # Tax benefits for tax-saving FD
        if is_tax_saving and tax_savings:
            st.subheader("💹 Tax Benefits")
            
            st.success(f"""
            ### Section 80C Tax Benefits
            
            Your tax-saving FD investment of ₹{min(principal, 150000):,.2f} qualifies for deduction under Section 80C.
            
            - **Maximum Eligible Amount**: ₹1,50,000 per financial year
            - **Your Eligible Deduction**: ₹{min(principal, 150000):,.2f}
            - **Estimated Tax Savings**: ₹{tax_savings:,.2f} (based on 30% tax bracket)
            - **Effective Return**: {effective_rate:.2f}% + tax benefits
            
            **Note**: Tax benefits are subject to your overall 80C limits and income tax rules.
            """)
        
        # ICICI FD features and comparison
        col1, col2 = st.columns(2)
        with col1:
            st.info("""
            ### ICICI Bank FD Features
            - Flexible tenure options from 7 days to 10 years
            - Multiple payout options (monthly, quarterly, etc.)
            - Auto-renewal and sweep-in facilities
            - Nomination facility available
            - Loan against FD up to 90% of principal
            - Premature withdrawal option (with penalty)
            - Online management through ICICI net banking
            - Special FD options for NRIs (NRE/NRO/FCNR)
            """)
        
        with col2:
            st.success("""
            ### ICICI Bank FD Benefits
            - Well-established bank with strong safety ratings
            - Guaranteed returns
            - Additional rate for senior citizens
            - Tax exemption for NRE deposits
            - TDS exemption with Form 15G/15H (if eligible)
            - Flexible payout options for regular income
            - No market risk unlike mutual funds
            - Tax-saving option under Section 80C
            """)
        
        # Comparison with other FD options
        st.subheader("🔄 Comparison with Other FD Options")
        
        comparison_data = {
            'Bank/Institution': ['ICICI Bank', 'HDFC Bank', 'SBI', 'Axis Bank', 'Post Office', 'Small Finance Banks'],
            'Interest Rate Range (%)': [f'{interest_rate-0.3}-{interest_rate+0.3}', '5.75-7.25', '5.75-7.0', '5.5-7.0', '6.9-7.5', '7.0-9.0'],
            'Min. Investment': ['₹10,000', '₹5,000', '₹1,000', '₹5,000', '₹1,000', '₹1,000'],
            'NRE Account Option': ['Yes', 'Yes', 'Yes', 'Yes', 'No', 'Limited'],
            'Safety Level': ['Very High', 'Very High', 'Very High', 'Very High', 'Very High (Govt)', 'High']
        }
        
        comparison_df = pd.DataFrame(comparison_data)
        st.dataframe(comparison_df, use_container_width=True)
        
        # NRI specific information if applicable
        if is_nre:
            with st.expander("🌎 NRI Banking Information"):
                st.write("""
                ### ICICI Bank NRE Fixed Deposit Information
                
                **Account Eligibility**: 
                - Non-Resident Indians (NRIs)
                - Persons of Indian Origin (PIOs)
                - Overseas Citizens of India (OCIs)
                
                **Benefits**:
                - Interest income is tax-free in India
                - Principal and interest are fully repatriable outside India
                - Available in Indian Rupees (INR)
                - Can be opened jointly with other NRIs/PIOs
                
                **Documents Required**:
                - Completed account opening form
                - KYC documents (passport, visa, etc.)
                - Recent photograph
                - Overseas address proof
                - PAN card or Form 60
                
                **Currency Conversion**:
                - Deposits must be made through inward remittance in foreign currency
                - Funds are converted to INR at the prevailing exchange rate
                
                **Tax Implications**:
                - No TDS on interest in India
                - May be taxable in your country of residence as per local tax laws
                - No wealth tax in India
                
                **Important Notes**:
                - Premature withdrawal may result in lower interest rates
                - Changes in residential status require notification to the bank
                - Auto-renewal available with instructions
                """)
        
        # TDS and taxation information
        with st.expander("📝 TDS & Taxation Details"):
            st.write("""
            ### TDS on ICICI Bank Fixed Deposits
            
            1. **TDS Applicability**: 
               - If interest income exceeds ₹40,000 in a financial year (₹50,000 for senior citizens)
               - TDS rate: 10% (if PAN is provided), 20% (if PAN not provided)
               - For NRE deposits: No TDS applicable
            
            2. **TDS Exemption**:
               - Submit Form 15G (for non-senior citizens) or 15H (for senior citizens) if your total income is below taxable limit
               - Forms can be submitted online through ICICI Bank net banking or mobile banking
            
            3. **Tax Implications**:
               - Interest earned is fully taxable under "Income from Other Sources" for residents
               - Must be reported in your income tax return even if TDS is not deducted
               - Taxed at your applicable income tax slab rate
               - For NRE deposits: Interest is exempt from tax in India
            
            4. **For Tax-Saving FDs**:
               - Investment up to ₹1.5 lakh qualifies for deduction under Section 80C
               - 5-year lock-in period is mandatory
               - Interest earned is still taxable
            
            **Note**: Tax rules are subject to change. Consult your tax advisor for personalized advice.
            """)
        
        # Premature withdrawal information
        with st.expander("💰 Premature Withdrawal Rules"):
            st.write("""
            ### ICICI Bank FD Premature Withdrawal Rules
            
            1. **Penalty**: 
               - Typically 1% lower rate than the applicable rate for the actual period
               - The penalty may vary based on the deposit amount and tenure
               - For large deposits (>₹1 crore), penalties may be negotiable
            
            2. **Tax-Saving FD**:
               - Premature withdrawal not allowed before 5 years
               - Exceptions may apply in case of the depositor's death
            
            3. **Partial Withdrawal**:
               - Available for certain FD types with minimum balance requirements
               - Not available for tax-saving FDs
               - Multiple withdrawals may be restricted
            
            4. **Loan Against FD**:
               - Alternative to premature withdrawal
               - Usually up to 90% of the FD value
               - Interest rate typically 2% higher than the FD rate
            
            **Process**:
            - Visit your ICICI Bank branch with your FD receipt
            - Submit a withdrawal request form
            - Verify your identity through appropriate documents
            - Funds typically credited within 1-2 working days
            - Can also process online through ICICI Bank net banking for certain FD types
            
            **Note**: Rules and penalties are subject to change. Check with your ICICI Bank branch for the latest terms.
            """)

def show_hdfc_fd_calculator():
    """Show the HDFC Bank Fixed Deposit (FD) calculator interface"""
    st.header("HDFC Bank Fixed Deposit Calculator 🏦")
    st.write("""
    Calculate returns on your HDFC Bank Fixed Deposit investments with this comprehensive calculator.
    Compare different payout frequencies, special citizen rates, and tax benefits.
    """)
    
    col1, col2 = st.columns(2)
    with col1:
        principal = st.number_input(
            "Principal Amount (₹)",
            min_value=5000,
            max_value=50000000,
            value=100000,
            step=10000,
            help="Minimum FD amount is ₹5,000"
        )
        
        # HDFC FD interest rates as of April 2025 (simplified)
        term_options = [
            "7-14 days", "15-29 days", "30-45 days", "46-60 days", 
            "61-90 days", "91-120 days", "121-179 days", "180-270 days",
            "271-364 days", "1-2 years", "2-3 years", "3-5 years", "5-10 years"
        ]
        interest_rates = {
            "7-14 days": 3.0,
            "15-29 days": 3.5,
            "30-45 days": 4.0,
            "46-60 days": 4.5,
            "61-90 days": 4.75,
            "91-120 days": 5.0,
            "121-179 days": 5.25,
            "180-270 days": 5.75,
            "271-364 days": 6.0,
            "1-2 years": 6.25,
            "2-3 years": 6.5,
            "3-5 years": 6.75,
            "5-10 years": 7.0
        }
        
        selected_term = st.selectbox(
            "Term Period",
            options=term_options,
            index=9,  # Default to 1-2 years
            help="Select tenure period for your FD"
        )
        
        # Convert selected term to days for calculation
        term_days_map = {
            "7-14 days": 10,
            "15-29 days": 22,
            "30-45 days": 38,
            "46-60 days": 53,
            "61-90 days": 75,
            "91-120 days": 105,
            "121-179 days": 150,
            "180-270 days": 225,
            "271-364 days": 318,
            "1-2 years": 545,  # ~1.5 years in days
            "2-3 years": 912,  # ~2.5 years in days
            "3-5 years": 1460,  # ~4 years in days
            "5-10 years": 2555   # ~7 years in days
        }
        tenure_days = term_days_map[selected_term]
        
        interest_rate = interest_rates[selected_term]
        st.write(f"**Current Interest Rate:** {interest_rate}% p.a.")
        
        payout_frequency = st.selectbox(
            "Interest Payout Frequency",
            options=["At Maturity", "Monthly", "Quarterly", "Half-Yearly", "Yearly"],
            index=0,
            help="Select how you want to receive interest payouts"
        )
    
    with col2:
        investor_type = st.radio(
            "Investor Category",
            options=["Regular", "Senior Citizen (60+)", "Super Senior Citizen (80+)"],
            index=0,
            help="Senior citizens get 0.5% additional interest, Super Senior citizens get 0.75% additional interest"
        )
        
        is_senior = investor_type == "Senior Citizen (60+)"
        is_super_senior = investor_type == "Super Senior Citizen (80+)"
        
        fd_type = st.radio(
            "FD Type",
            options=["Regular FD", "Tax-Saving FD (5 years)"],
            index=0,
            help="Tax-saving FDs have 5-year lock-in but offer 80C tax benefits"
        )
        
        is_tax_saving = fd_type == "Tax-Saving FD (5 years)"
        
        # Force 5-year term for tax-saving FDs
        if is_tax_saving:
            tenure_days = 1825  # 5 years
            interest_rate = interest_rates["3-5 years"]
            st.info("Tax-saving FDs have a mandatory 5-year lock-in period")
            
        tax_bracket = st.selectbox(
            "Your Income Tax Bracket (%)",
            options=[0, 5, 10, 15, 20, 30],
            index=3,  # Default to 15%
            help="Select your income tax slab to calculate after-tax returns"
        )
    
    if st.button("Calculate HDFC FD Returns", use_container_width=True):
        # Calculate FD returns
        maturity_amount, interest_earned, effective_rate, periodic_payout, growth_details, tax_savings = calculate_hdfc_fd(
            principal, interest_rate, tenure_days, payout_frequency, is_senior, is_tax_saving, is_super_senior
        )
        
        # Calculate after-tax returns
        tax_on_interest = interest_earned * (tax_bracket / 100)
        after_tax_returns = interest_earned - tax_on_interest
        after_tax_maturity = principal + after_tax_returns
        
        tenure_years = tenure_days / 365.25
        effective_after_tax_rate = ((after_tax_maturity / principal) ** (1/tenure_years) - 1) * 100
        
        # Display results
        st.subheader("📊 HDFC FD Results")
        
        col1, col2, col3 = st.columns(3)
        with col1:
            st.metric(
                "Principal Amount",
                f"₹{principal:,.2f}",
                help="Your initial investment"
            )
        with col2:
            rate_delta = None
            if is_super_senior:
                rate_delta = "+0.75%"
            elif is_senior:
                rate_delta = "+0.5%"
                
            st.metric(
                "Effective Interest Rate",
                f"{effective_rate:.2f}%",
                rate_delta,
                help="Annual interest rate applicable to your deposit"
            )
        with col3:
            st.metric(
                "Interest Earned",
                f"₹{interest_earned:,.2f}",
                help="Total interest earned over the term period"
            )
        
        # Maturity details
        st.subheader("💰 Maturity Details")
        
        col1, col2, col3 = st.columns(3)
        with col1:
            st.metric(
                "Maturity Amount",
                f"₹{maturity_amount:,.2f}",
                help="Total amount at maturity"
            )
        with col2:
            st.metric(
                "After-Tax Maturity",
                f"₹{after_tax_maturity:.2f}",
                help="Maturity amount after tax deduction"
            )
        with col3:
            st.metric(
                "After-Tax Returns",
                f"{effective_after_tax_rate:.2f}%",
                help="Effective annual returns after tax"
            )
        
        # Payout details if applicable
        if payout_frequency != "At Maturity" and periodic_payout > 0:
            st.subheader("💸 Regular Payout Details")
            
            payout_frequency_text = {
                "Monthly": "Monthly",
                "Quarterly": "Quarterly",
                "Half-Yearly": "Half-yearly",
                "Yearly": "Yearly"
            }[payout_frequency]
            
            # Calculate after-tax payout
            after_tax_payout = periodic_payout * (1 - tax_bracket / 100)
            
            col1, col2 = st.columns(2)
            with col1:
                st.metric(
                    f"{payout_frequency_text} Interest Payout",
                    f"₹{periodic_payout:,.2f}",
                    help=f"Interest payout every {payout_frequency.lower()} before tax"
                )
            with col2:
                st.metric(
                    f"After-Tax {payout_frequency_text} Payout",
                    f"₹{after_tax_payout:.2f}",
                    help=f"Interest payout after tax deduction"
                )
                
            # Show yearly summary for payouts
            if payout_frequency != "Yearly":
                yearly_payout_map = {
                    "Monthly": 12,
                    "Quarterly": 4,
                    "Half-Yearly": 2
                }
                
                yearly_payout = periodic_payout * yearly_payout_map[payout_frequency]
                after_tax_yearly = after_tax_payout * yearly_payout_map[payout_frequency]
                
                st.info(f"""
                ### Yearly Payout Summary
                - **Yearly Interest Income**: ₹{yearly_payout:,.2f}
                - **After-Tax Yearly Income**: ₹{after_tax_yearly:,.2f}
                - **Monthly Average**: ₹{yearly_payout/12:,.2f} (pre-tax) / ₹{after_tax_yearly/12:,.2f} (after-tax)
                """)
        
        # Growth details visualization
        st.subheader("📈 Growth Visualization")
        
        # Create a DataFrame for periods
        df = pd.DataFrame(growth_details)
        
        # Create period labels
        period_type_text = df['period_type'].iloc[0] if not df.empty else "month"
        df['period_label'] = df['period'].apply(lambda p: f"Period {p} ({period_type_text})")
        
        # Filter for better visualization in large datasets
        max_points = 20
        step = max(1, len(df) // max_points)
        filtered_df = df.iloc[::step].copy()
        
        if len(df) - 1 not in filtered_df.index and len(df) > 0:  # Ensure last period is included
            filtered_df = pd.concat([filtered_df, df.iloc[[-1]]])
        
        # Display growth details
        if payout_frequency == "At Maturity":
            # For lump sum at maturity - show compound growth
            fig = px.line(
                df,
                x='period',
                y='closing_balance',
                title=f'HDFC FD Growth Over {tenure_days} Days',
                labels={'closing_balance': 'Amount (₹)', 'period': 'Period'}
            )
            
            # Add interest as a bar chart
            fig.add_bar(
                x=df['period'],
                y=df['interest'],
                name='Interest',
                opacity=0.7
            )
            
            st.plotly_chart(fig, use_container_width=True)
            
            # Display a table with growth details
            st.dataframe(
                df[['period', 'opening_balance', 'interest', 'closing_balance']].style.format({
                    'opening_balance': '₹{:,.2f}',
                    'interest': '₹{:,.2f}',
                    'closing_balance': '₹{:,.2f}'
                }),
                use_container_width=True
            )
        else:
            # For periodic payouts - show regular income
            fig1 = px.bar(
                filtered_df,
                x='period',
                y='payout',
                title=f'{payout_frequency} Payout from HDFC FD',
                labels={'payout': 'Payout Amount (₹)', 'period': 'Period'}
            )
            
            st.plotly_chart(fig1, use_container_width=True)
            
            # Calculate cumulative payouts
            df['cumulative_payout'] = df['payout'].cumsum()
            
            # Visualization of cumulative income
            fig2 = px.line(
                df,
                x='period',
                y='cumulative_payout',
                title='Cumulative Interest Income Over Time',
                labels={'cumulative_payout': 'Cumulative Payout (₹)', 'period': 'Period'}
            )
            
            st.plotly_chart(fig2, use_container_width=True)
            
            # Display a table with payout details
            st.dataframe(
                df[['period', 'interest', 'payout', 'cumulative_payout']].style.format({
                    'interest': '₹{:,.2f}',
                    'payout': '₹{:,.2f}',
                    'cumulative_payout': '₹{:,.2f}'
                }),
                use_container_width=True
            )
        
        # Tax benefits for tax-saving FD
        if is_tax_saving and tax_savings:
            st.subheader("💹 Tax Benefits")
            
            st.success(f"""
            ### Section 80C Tax Benefits
            
            Your tax-saving FD investment of ₹{min(principal, 150000):,.2f} qualifies for deduction under Section 80C.
            
            - **Maximum Eligible Amount**: ₹1,50,000 per financial year
            - **Your Eligible Deduction**: ₹{min(principal, 150000):,.2f}
            - **Estimated Tax Savings**: ₹{tax_savings:,.2f} (based on 30% tax bracket)
            - **Effective Return**: {effective_rate:.2f}% + tax benefits
            
            **Note**: Tax benefits are subject to your overall 80C limits and income tax rules.
            """)
        
        # HDFC FD features and comparison
        col1, col2 = st.columns(2)
        with col1:
            st.info("""
            ### HDFC Bank FD Features
            - Flexible tenure options from 7 days to 10 years
            - Multiple payout options (monthly, quarterly, etc.)
            - Auto-renewal facility available
            - Nomination facility available
            - Loan against FD up to 90% of principal
            - Premature withdrawal option (with penalty)
            - Online management through HDFC net banking
            - Special rates for super senior citizens (80+ years)
            """)
        
        with col2:
            st.success("""
            ### HDFC Bank FD Benefits
            - Strong bank with high safety ratings
            - Guaranteed returns
            - Additional rate for senior citizens
            - Premium rates for super senior citizens
            - TDS exemption with Form 15G/15H (if eligible)
            - Higher liquidity compared to Post Office schemes
            - No market risk unlike mutual funds
            - Tax-saving option under Section 80C
            """)
        
        # Comparison with other FD options
        st.subheader("🔄 Comparison with Other FD Options")
        
        comparison_data = {
            'Bank/Institution': ['HDFC Bank', 'SBI', 'ICICI Bank', 'Axis Bank', 'Post Office', 'Small Finance Banks'],
            'Interest Rate Range (%)': [f'{interest_rate-0.5}-{interest_rate+0.5}', '5.75-7.0', '5.75-7.0', '5.5-7.0', '6.9-7.5', '7.0-9.0'],
            'Min. Investment': ['₹5,000', '₹1,000', '₹10,000', '₹5,000', '₹1,000', '₹1,000'],
            'Special Senior Rates': ['Yes (Super Senior Category)', 'No', 'No', 'No', 'Yes', 'Varies'],
            'Safety Level': ['Very High', 'Very High', 'Very High', 'Very High', 'Very High (Govt)', 'High']
        }
        
        comparison_df = pd.DataFrame(comparison_data)
        st.dataframe(comparison_df, use_container_width=True)
        
        # TDS and taxation information
        with st.expander("📝 TDS & Taxation Details"):
            st.write("""
            ### TDS on HDFC Bank Fixed Deposits
            
            1. **TDS Applicability**: 
               - If interest income exceeds ₹40,000 in a financial year (₹50,000 for senior citizens)
               - TDS rate: 10% (if PAN is provided), 20% (if PAN not provided)
            
            2. **TDS Exemption**:
               - Submit Form 15G (for non-senior citizens) or 15H (for senior citizens) if your total income is below taxable limit
               - Forms can be submitted online through HDFC Bank net banking
            
            3. **Tax Implications**:
               - Interest earned is fully taxable under "Income from Other Sources"
               - Must be reported in your income tax return even if TDS is not deducted
               - Taxed at your applicable income tax slab rate
            
            4. **For Tax-Saving FDs**:
               - Investment up to ₹1.5 lakh qualifies for deduction under Section 80C
               - 5-year lock-in period is mandatory
               - Interest earned is still taxable
            
            **Note**: Tax rules are subject to change. Consult your tax advisor for personalized advice.
            """)
        
        # Premature withdrawal information
        with st.expander("💰 Premature Withdrawal Rules"):
            st.write("""
            ### HDFC Bank FD Premature Withdrawal Rules
            
            1. **Penalty**: 
               - Typically 1% lower rate than the applicable rate for the actual period
               - The penalty may vary based on the deposit amount and tenure
            
            2. **Tax-Saving FD**:
               - Premature withdrawal not allowed before 5 years
               - Exceptions may apply in case of the depositor's death
            
            3. **Partial Withdrawal**:
               - Available for certain FD types with minimum balance requirements
               - Not available for tax-saving FDs
            
            4. **Loan Against FD**:
               - Alternative to premature withdrawal
               - Usually up to 90% of the FD value
               - Interest rate typically 2% higher than the FD rate
            
            **Process**:
            - Visit your HDFC Bank branch with your FD receipt
            - Submit a withdrawal request form
            - Funds typically credited within 1 working day
            - Can also process online through HDFC Bank net banking for certain FD types
            
            **Note**: Rules and penalties are subject to change. Check with your HDFC Bank branch for the latest terms.
            """)

def show_sbi_fd_calculator():
    """Show the SBI Fixed Deposit (FD) calculator interface"""
    st.header("SBI Fixed Deposit Calculator 🏦")
    st.write("""
    Calculate returns on your SBI Fixed Deposit investments with this comprehensive calculator.
    Compare different payout frequencies, senior citizen rates, and tax benefits.
    """)
    
    col1, col2 = st.columns(2)
    with col1:
        principal = st.number_input(
            "Principal Amount (₹)",
            min_value=1000,
            max_value=50000000,
            value=100000,
            step=10000,
            help="Minimum FD amount is ₹1,000"
        )
        
        # SBI FD interest rates as of April 2025 (simplified)
        term_options = [
            "7-45 days", "46-179 days", "180-210 days", "211-364 days", 
            "1-2 years", "2-3 years", "3-5 years", "5-10 years"
        ]
        interest_rates = {
            "7-45 days": 3.0,
            "46-179 days": 4.5,
            "180-210 days": 5.25,
            "211-364 days": 5.5,
            "1-2 years": 6.0,
            "2-3 years": 6.25,
            "3-5 years": 6.5,
            "5-10 years": 6.75
        }
        
        selected_term = st.selectbox(
            "Term Period",
            options=term_options,
            index=5,  # Default to 2-3 years
            help="Select tenure period for your FD"
        )
        
        # Convert selected term to days for calculation
        term_days_map = {
            "7-45 days": 30,
            "46-179 days": 90,
            "180-210 days": 180,
            "211-364 days": 270,
            "1-2 years": 545,  # ~1.5 years in days
            "2-3 years": 912,  # ~2.5 years in days
            "3-5 years": 1460,  # ~4 years in days
            "5-10 years": 2555   # ~7 years in days
        }
        tenure_days = term_days_map[selected_term]
        
        interest_rate = interest_rates[selected_term]
        st.write(f"**Current Interest Rate:** {interest_rate}% p.a.")
        
        payout_frequency = st.selectbox(
            "Interest Payout Frequency",
            options=["At Maturity", "Monthly", "Quarterly", "Half-Yearly", "Yearly"],
            index=0,
            help="Select how you want to receive interest payouts"
        )
    
    with col2:
        investor_category = st.radio(
            "Investor Category",
            options=["Regular", "Senior Citizen"],
            index=0,
            help="Senior citizens get 0.5% additional interest"
        )
        
        is_senior = investor_category == "Senior Citizen"
        
        fd_type = st.radio(
            "FD Type",
            options=["Regular FD", "Tax-Saving FD (5 years)"],
            index=0,
            help="Tax-saving FDs have 5-year lock-in but offer 80C tax benefits"
        )
        
        is_tax_saving = fd_type == "Tax-Saving FD (5 years)"
        
        # Force 5-year term for tax-saving FDs
        if is_tax_saving:
            tenure_days = 1825  # 5 years
            interest_rate = interest_rates["3-5 years"]
            st.info("Tax-saving FDs have a mandatory 5-year lock-in period")
            
        tax_bracket = st.selectbox(
            "Your Income Tax Bracket (%)",
            options=[0, 5, 10, 15, 20, 30],
            index=3,  # Default to 15%
            help="Select your income tax slab to calculate after-tax returns"
        )
    
    if st.button("Calculate SBI FD Returns", use_container_width=True):
        # Calculate FD returns
        maturity_amount, interest_earned, effective_rate, periodic_payout, growth_details, tax_savings = calculate_sbi_fd(
            principal, interest_rate, tenure_days, payout_frequency, is_senior, is_tax_saving
        )
        
        # Calculate after-tax returns
        tax_on_interest = interest_earned * (tax_bracket / 100)
        after_tax_returns = interest_earned - tax_on_interest
        after_tax_maturity = principal + after_tax_returns
        
        tenure_years = tenure_days / 365.25
        effective_after_tax_rate = ((after_tax_maturity / principal) ** (1/tenure_years) - 1) * 100
        
        # Display results
        st.subheader("📊 SBI FD Results")
        
        col1, col2, col3 = st.columns(3)
        with col1:
            st.metric(
                "Principal Amount",
                f"₹{principal:,.2f}",
                help="Your initial investment"
            )
        with col2:
            st.metric(
                "Effective Interest Rate",
                f"{effective_rate:.2f}%",
                f"+0.5%" if is_senior else None,
                help="Annual interest rate applicable to your deposit"
            )
        with col3:
            st.metric(
                "Interest Earned",
                f"₹{interest_earned:,.2f}",
                help="Total interest earned over the term period"
            )
        
        # Maturity details
        st.subheader("💰 Maturity Details")
        
        col1, col2, col3 = st.columns(3)
        with col1:
            st.metric(
                "Maturity Amount",
                f"₹{maturity_amount:,.2f}",
                help="Total amount at maturity"
            )
        with col2:
            st.metric(
                "After-Tax Maturity",
                f"₹{after_tax_maturity:.2f}",
                help="Maturity amount after tax deduction"
            )
        with col3:
            st.metric(
                "After-Tax Returns",
                f"{effective_after_tax_rate:.2f}%",
                help="Effective annual returns after tax"
            )
        
        # Payout details if applicable
        if payout_frequency != "At Maturity" and periodic_payout > 0:
            st.subheader("💸 Regular Payout Details")
            
            payout_frequency_text = {
                "Monthly": "Monthly",
                "Quarterly": "Quarterly",
                "Half-Yearly": "Half-yearly",
                "Yearly": "Yearly"
            }[payout_frequency]
            
            # Calculate after-tax payout
            after_tax_payout = periodic_payout * (1 - tax_bracket / 100)
            
            col1, col2 = st.columns(2)
            with col1:
                st.metric(
                    f"{payout_frequency_text} Interest Payout",
                    f"₹{periodic_payout:,.2f}",
                    help=f"Interest payout every {payout_frequency.lower()} before tax"
                )
            with col2:
                st.metric(
                    f"After-Tax {payout_frequency_text} Payout",
                    f"₹{after_tax_payout:.2f}",
                    help=f"Interest payout after tax deduction"
                )
                
            # Show yearly summary for payouts
            if payout_frequency != "Yearly":
                yearly_payout_map = {
                    "Monthly": 12,
                    "Quarterly": 4,
                    "Half-Yearly": 2
                }
                
                yearly_payout = periodic_payout * yearly_payout_map[payout_frequency]
                after_tax_yearly = after_tax_payout * yearly_payout_map[payout_frequency]
                
                st.info(f"""
                ### Yearly Payout Summary
                - **Yearly Interest Income**: ₹{yearly_payout:,.2f}
                - **After-Tax Yearly Income**: ₹{after_tax_yearly:,.2f}
                - **Monthly Average**: ₹{yearly_payout/12:,.2f} (pre-tax) / ₹{after_tax_yearly/12:,.2f} (after-tax)
                """)
        
        # Growth details visualization
        st.subheader("📈 Growth Visualization")
        
        # Create a DataFrame for periods
        df = pd.DataFrame(growth_details)
        
        # Create period labels
        period_type_text = df['period_type'].iloc[0] if not df.empty else "month"
        df['period_label'] = df['period'].apply(lambda p: f"Period {p} ({period_type_text})")
        
        # Filter for better visualization in large datasets
        max_points = 20
        step = max(1, len(df) // max_points)
        filtered_df = df.iloc[::step].copy()
        
        if len(df) - 1 not in filtered_df.index and len(df) > 0:  # Ensure last period is included
            filtered_df = pd.concat([filtered_df, df.iloc[[-1]]])
        
        # Display growth details
        if payout_frequency == "At Maturity":
            # For lump sum at maturity - show compound growth
            fig = px.line(
                df,
                x='period',
                y='closing_balance',
                title=f'SBI FD Growth Over {tenure_days} Days',
                labels={'closing_balance': 'Amount (₹)', 'period': 'Period'}
            )
            
            # Add interest as a bar chart
            fig.add_bar(
                x=df['period'],
                y=df['interest'],
                name='Interest',
                opacity=0.7
            )
            
            st.plotly_chart(fig, use_container_width=True)
            
            # Display a table with growth details
            st.dataframe(
                df[['period', 'opening_balance', 'interest', 'closing_balance']].style.format({
                    'opening_balance': '₹{:,.2f}',
                    'interest': '₹{:,.2f}',
                    'closing_balance': '₹{:,.2f}'
                }),
                use_container_width=True
            )
        else:
            # For periodic payouts - show regular income
            fig1 = px.bar(
                filtered_df,
                x='period',
                y='payout',
                title=f'{payout_frequency} Payout from SBI FD',
                labels={'payout': 'Payout Amount (₹)', 'period': 'Period'}
            )
            
            st.plotly_chart(fig1, use_container_width=True)
            
            # Calculate cumulative payouts
            df['cumulative_payout'] = df['payout'].cumsum()
            
            # Visualization of cumulative income
            fig2 = px.line(
                df,
                x='period',
                y='cumulative_payout',
                title='Cumulative Interest Income Over Time',
                labels={'cumulative_payout': 'Cumulative Payout (₹)', 'period': 'Period'}
            )
            
            st.plotly_chart(fig2, use_container_width=True)
            
            # Display a table with payout details
            st.dataframe(
                df[['period', 'interest', 'payout', 'cumulative_payout']].style.format({
                    'interest': '₹{:,.2f}',
                    'payout': '₹{:,.2f}',
                    'cumulative_payout': '₹{:,.2f}'
                }),
                use_container_width=True
            )
        
        # Tax benefits for tax-saving FD
        if is_tax_saving and tax_savings:
            st.subheader("💹 Tax Benefits")
            
            st.success(f"""
            ### Section 80C Tax Benefits
            
            Your tax-saving FD investment of ₹{min(principal, 150000):,.2f} qualifies for deduction under Section 80C.
            
            - **Maximum Eligible Amount**: ₹1,50,000 per financial year
            - **Your Eligible Deduction**: ₹{min(principal, 150000):,.2f}
            - **Estimated Tax Savings**: ₹{tax_savings:,.2f} (based on 30% tax bracket)
            - **Effective Return**: {effective_rate:.2f}% + tax benefits
            
            **Note**: Tax benefits are subject to your overall 80C limits and income tax rules.
            """)
        
        # SBI FD features and comparison
        col1, col2 = st.columns(2)
        with col1:
            st.info("""
            ### SBI FD Features
            - Flexible tenure options from 7 days to 10 years
            - Multiple payout options (monthly, quarterly, etc.)
            - Auto-renewal facility available
            - Nomination facility available
            - Loan against FD up to 90% of principal
            - Premature withdrawal option (with penalty)
            - Online management through SBI net banking
            """)
        
        with col2:
            st.success("""
            ### SBI FD Benefits
            - Safe and secure investment option
            - Guaranteed returns
            - Additional rate for senior citizens
            - TDS exemption with Form 15G/15H (if eligible)
            - Higher liquidity compared to PPF/NSC
            - No market risk unlike mutual funds
            - Tax-saving option under Section 80C
            """)
        
        # Comparison with other FD options
        st.subheader("🔄 Comparison with Other FD Options")
        
        comparison_data = {
            'Bank/Institution': ['SBI', 'HDFC Bank', 'ICICI Bank', 'Axis Bank', 'Post Office', 'Small Finance Banks'],
            'Interest Rate Range (%)': [f'{interest_rate-0.5}-{interest_rate+0.5}', '5.5-7.0', '5.75-7.0', '5.5-7.0', '6.9-7.5', '7.0-9.0'],
            'Min. Investment': ['₹1,000', '₹5,000', '₹10,000', '₹5,000', '₹1,000', '₹1,000'],
            'Premature Withdrawal': ['Allowed with penalty', 'Allowed with penalty', 'Allowed with penalty', 'Allowed with penalty', 'Allowed with penalty', 'Varies'],
            'Safety Level': ['Very High', 'Very High', 'Very High', 'Very High', 'Very High (Govt)', 'High']
        }
        
        comparison_df = pd.DataFrame(comparison_data)
        st.dataframe(comparison_df, use_container_width=True)
        
        # TDS and taxation information
        with st.expander("📝 TDS & Taxation Details"):
            st.write("""
            ### TDS on SBI Fixed Deposits
            
            1. **TDS Applicability**: 
               - If interest income exceeds ₹40,000 in a financial year (₹50,000 for senior citizens)
               - TDS rate: 10% (if PAN is provided), 20% (if PAN not provided)
            
            2. **TDS Exemption**:
               - Submit Form 15G (for non-senior citizens) or 15H (for senior citizens) if your total income is below taxable limit
               - Forms must be submitted for each financial year
            
            3. **Tax Implications**:
               - Interest earned is fully taxable under "Income from Other Sources"
               - Must be reported in your income tax return even if TDS is not deducted
               - Taxed at your applicable income tax slab rate
            
            4. **For Tax-Saving FDs**:
               - Investment up to ₹1.5 lakh qualifies for deduction under Section 80C
               - 5-year lock-in period is mandatory
               - Interest earned is still taxable
            
            **Note**: Tax rules are subject to change. Consult your tax advisor for personalized advice.
            """)
        
        # Premature withdrawal information
        with st.expander("💰 Premature Withdrawal Rules"):
            st.write("""
            ### SBI FD Premature Withdrawal Rules
            
            1. **Penalty**: 
               - Typically 0.5% to 1% lower rate than the applicable rate for the actual period
               - The penalty varies based on the deposit amount and tenure
            
            2. **Tax-Saving FD**:
               - Premature withdrawal not allowed before 5 years
               - Exceptions may apply in case of the depositor's death
            
            3. **Partial Withdrawal**:
               - Allowed for certain FD types with minimum balance requirements
               - Not available for tax-saving FDs
            
            4. **Loan Against FD**:
               - Alternative to premature withdrawal
               - Usually up to 90% of the FD value
               - Interest rate typically 1-2% higher than the FD rate
            
            **Process**:
            - Visit your SBI branch with your FD receipt
            - Submit a withdrawal request form
            - Funds typically credited within 1-2 working days
            
            **Note**: Rules and penalties are subject to change. Check with your SBI branch for the latest terms.
            """)

def show_post_office_mis_calculator():
    """Show the Post Office Monthly Income Scheme (MIS) calculator interface"""
    st.header("Post Office Monthly Income Scheme Calculator 🏤")
    st.write("""
    Calculate regular monthly income from your Post Office MIS investment with this comprehensive calculator.
    Post Office MIS provides a steady monthly income by investing a lump sum amount.
    """)
    
    col1, col2 = st.columns(2)
    with col1:
        principal = st.number_input(
            "Principal Amount (₹)",
            min_value=1000,
            max_value=900000,
            value=100000,
            step=10000,
            help="Min: ₹1,000, Max: ₹4.5 lakhs (single), ₹9 lakhs (joint)"
        )
        
        # Post Office MIS interest rate as of April 2025
        interest_rate = 7.1  # Current interest rate
        st.write(f"**Current Interest Rate:** {interest_rate}% p.a.")
        
        # MIS has fixed 5-year tenure
        tenure_years = 5
        st.write(f"**Tenure:** {tenure_years} years (fixed)")
        
    with col2:
        investor_category = st.radio(
            "Investor Category",
            options=["Regular", "Senior Citizen"],
            index=0,
            help="Senior citizens get 0.5% additional interest"
        )
        
        is_senior = investor_category == "Senior Citizen"
        
        account_type = st.radio(
            "Account Type",
            options=["Single", "Joint"],
            index=0,
            help="Joint account allows higher investment limit (₹9 lakhs vs ₹4.5 lakhs)"
        )
        
        is_joint = account_type == "Joint"
        
        tax_bracket = st.selectbox(
            "Your Income Tax Bracket (%)",
            options=[0, 5, 10, 15, 20, 30],
            index=3,  # Default to 15%
            help="Select your income tax slab to calculate after-tax income"
        )
    
    # Check investment limit based on account type
    investment_limit = 900000 if is_joint else 450000
    if principal > investment_limit:
        st.warning(f"⚠️ Maximum investment limit for a {account_type.lower()} account is ₹{investment_limit:,}. Calculations will be based on this limit.")
        principal = investment_limit
    
    if st.button("Calculate Monthly Income", use_container_width=True):
        # Calculate MIS returns
        monthly_income, total_income, maturity_amount, effective_rate, monthly_details = calculate_post_office_mis(
            principal, interest_rate, tenure_years, is_senior
        )
        
        # Calculate after-tax income
        tax_on_income = monthly_income * (tax_bracket / 100)
        after_tax_monthly_income = monthly_income - tax_on_income
        total_after_tax_income = after_tax_monthly_income * (tenure_years * 12)
        
        # Display results
        st.subheader("💰 Monthly Income Details")
        
        col1, col2, col3 = st.columns(3)
        with col1:
            st.metric(
                "Monthly Income",
                f"₹{monthly_income:,.2f}",
                help="Regular monthly payout from MIS"
            )
        with col2:
            st.metric(
                "After-Tax Monthly Income",
                f"₹{after_tax_monthly_income:,.2f}",
                help="Monthly income after tax deduction"
            )
        with col3:
            st.metric(
                "Effective Interest Rate",
                f"{effective_rate:.2f}%",
                f"+0.5%" if is_senior else None,
                help="Annual interest rate applicable to your deposit"
            )
        
        # Total income details
        st.subheader("📊 Total Returns")
        
        col1, col2, col3 = st.columns(3)
        with col1:
            st.metric(
                "Principal Amount",
                f"₹{principal:,.2f}",
                help="Your initial investment in MIS"
            )
        with col2:
            st.metric(
                "Total Income Over 5 Years",
                f"₹{total_income:,.2f}",
                help="Total interest earned over 5 years"
            )
        with col3:
            st.metric(
                "After-Tax Total Income",
                f"₹{total_after_tax_income:,.2f}",
                help="Total income after tax deduction"
            )
        
        # Create visualization for monthly income stream
        st.subheader("📈 Income Stream Visualization")
        
        # Create a DataFrame for visualization
        df = pd.DataFrame(monthly_details)
        df['month_year'] = df.apply(lambda x: f"Y{x['year']}M{x['month_in_year']}", axis=1)
        
        # Filter for better visualization (showing quarterly points)
        filter_step = 3
        filtered_df = df.iloc[::filter_step].copy()
        if len(df) - 1 not in filtered_df.index:  # Ensure last point is included
            filtered_df = pd.concat([filtered_df, df.iloc[[-1]]])
        
        # Monthly income visualization
        fig1 = px.bar(
            filtered_df,
            x='month',
            y='monthly_income',
            title='Monthly Income Stream',
            labels={'monthly_income': 'Income (₹)', 'month': 'Month'}
        )
        
        # Set y-axis to start from 0
        fig1.update_layout(
            yaxis_range=[0, monthly_income * 1.2],
            xaxis_title="Month",
            yaxis_title="Monthly Income (₹)"
        )
        
        st.plotly_chart(fig1, use_container_width=True)
        
        # Cumulative income visualization
        fig2 = px.line(
            df,
            x='month',
            y='cumulative_income',
            title='Cumulative Income Over Time',
            labels={'cumulative_income': 'Cumulative Income (₹)', 'month': 'Month'}
        )
        
        # Set y-axis to start from 0
        fig2.update_layout(
            xaxis_title="Month",
            yaxis_title="Cumulative Income (₹)"
        )
        
        st.plotly_chart(fig2, use_container_width=True)
        
        # Income details
        with st.expander("💼 Monthly Income Details"):
            # Display quarterly income for better readability
            quarterly_df = df.iloc[::3].copy()
            quarterly_df['Quarter'] = quarterly_df['month'].apply(lambda m: f"Q{(m-1)//3 + 1}, Year {(m-1)//12 + 1}")
            
            st.dataframe(
                quarterly_df[['Quarter', 'monthly_income', 'cumulative_income']].style.format({
                    'monthly_income': '₹{:,.2f}',
                    'cumulative_income': '₹{:,.2f}'
                }),
                use_container_width=True
            )
        
        # Financial planning insights
        st.subheader("💡 Financial Planning Insights")
        
        # Calculate what percentage of principal is returned as income
        income_to_principal_ratio = (total_income / principal) * 100
        roi = income_to_principal_ratio - 100  # Actual ROI after getting principal back
        
        st.info(f"""
        ### Income Analysis
        - **Return on Investment**: {income_to_principal_ratio:.2f}% (including return of principal)
        - **Net Interest Earned**: {roi:.2f}% over 5 years
        - **Monthly Income as % of Principal**: {(monthly_income / principal) * 100:.2f}% per month
        - **Annual Income as % of Principal**: {(monthly_income * 12 / principal) * 100:.2f}% per year
        
        ### Inflation Impact
        Assuming 5% annual inflation, your effective purchasing power will reduce over time:
        - **Year 1**: Full purchasing power
        - **Year 5**: Approximately {100 - (5 * 5):.1f}% of original purchasing power
        """)
        
        # Budget planning
        st.subheader("📝 Budget Planning with MIS Income")
        
        # Calculate recommended expense allocation based on the monthly income
        essentials = monthly_income * 0.7  # 70% for essential expenses
        discretionary = monthly_income * 0.2  # 20% for discretionary spending
        reinvestment = monthly_income * 0.1  # 10% for reinvestment
        
        # Create expense allocation chart
        expense_data = pd.DataFrame({
            'Category': ['Essential Expenses', 'Discretionary Spending', 'Reinvestment'],
            'Amount': [essentials, discretionary, reinvestment]
        })
        
        fig3 = px.pie(
            expense_data,
            values='Amount',
            names='Category',
            title='Recommended Monthly Income Allocation',
            hole=0.4,
            color_discrete_sequence=['#3366CC', '#DC3912', '#FF9900']
        )
        
        st.plotly_chart(fig3, use_container_width=True)
        
        # Allocation details
        st.write("""
        ### Suggested Monthly Allocation
        """)
        
        col1, col2, col3 = st.columns(3)
        with col1:
            st.metric(
                "Essential Expenses (70%)",
                f"₹{essentials:,.2f}"
            )
        with col2:
            st.metric(
                "Discretionary (20%)",
                f"₹{discretionary:,.2f}"
            )
        with col3:
            st.metric(
                "Reinvestment (10%)",
                f"₹{reinvestment:,.2f}"
            )
        
        # Additional information and benefits
        col1, col2 = st.columns(2)
        with col1:
            st.info("""
            ### Key Features of Post Office MIS
            - Fixed 5-year tenure
            - Government-backed security
            - Regular monthly income
            - Can open in any post office
            - Nomination facility available
            - No TDS but income is taxable
            - Senior citizens get additional 0.5% interest
            """)
        
        with col2:
            st.success("""
            ### Investment Features
            - Minimum investment: ₹1,000
            - Maximum investment: ₹4.5 lakhs (single account)
            - Maximum investment: ₹9 lakhs (joint account)
            - Premature withdrawal: Allowed after 1 year (with penalty)
            - Extension: Cannot be extended beyond 5 years
            - Payment: Monthly income credited to savings account
            - Monthly Income: Paid on a fixed date each month
            """)
        
        # Comparison with other monthly income options
        st.subheader("🔄 Comparison with Other Monthly Income Options")
        
        comparison_data = {
            'Investment Option': ['Post Office MIS', 'Bank FD with Monthly Payout', 'SCSS (Senior Citizen)', 'SWP from Debt Fund', 'Monthly Pension Plan'],
            'Current Returns (%)': [7.1, '5.5-6.5', 8.2, '6.0-7.0', '5.0-6.0'],
            'Maximum Investment': ['₹4.5L/9L', 'No limit', '₹15 lakhs', 'No limit', 'Varies'],
            'Lock-in Period': ['5 years', 'Varies', '5 years', 'None', '5-10 years'],
            'Tax Treatment': ['Taxable as income', 'Taxable as income', 'Taxable as income', 'More tax efficient', 'Partially taxable']
        }
        
        comparison_df = pd.DataFrame(comparison_data)
        st.dataframe(comparison_df, use_container_width=True)
        
        # Tax implications
        with st.expander("📝 Taxation & Premature Withdrawal"):
            st.write("""
            ### Tax Implications of Post Office MIS
            
            1. **Interest Taxability**: Monthly income from MIS is fully taxable under "Income from Other Sources"
            2. **TDS**: No TDS is deducted at source, but you must declare income in your Income Tax Return
            3. **Form 15G/15H**: Not applicable as Post Office doesn't deduct TDS
            
            ### Premature Withdrawal Rules
            
            1. **Before 1 year**: Not allowed
            2. **Between 1-3 years**: 2% penalty on principal amount
            3. **After 3 years**: 1% penalty on principal amount
            4. **Documentation**: Requires ID proof and original certificate for premature closure
            
            *Note: Rules may change - check with your post office for the latest terms and conditions.*
            """)

def calculate_post_office_ppf(annual_investment, interest_rate, years=15):
    """
    Calculate Post Office Public Provident Fund (PPF) returns
    
    Args:
        annual_investment: Annual investment amount (Min: 500, Max: 150000)
        interest_rate: Annual interest rate (%)
        years: Investment period (default 15 years, min: 15, max: 50)
        
    Returns:
        Tuple containing (maturity_amount, total_investment, total_interest, yearly_details)
    """
    # Post Office PPF has the same calculation logic as regular PPF
    # but with specific Post Office rules and features
    
    balance = 0
    yearly_details = []
    
    for year in range(1, years + 1):
        opening_balance = balance
        interest = (opening_balance + annual_investment) * (interest_rate / 100)
        balance = opening_balance + annual_investment + interest
        
        # Track loan eligibility (from 3rd year onwards, up to 6th year)
        loan_eligible = year >= 3 and year <= 6
        
        # Track partial withdrawal eligibility (from 7th year onwards)
        withdrawal_eligible = year >= 7
        
        # Calculate loan limit if eligible (25% of balance at end of 2nd preceding year)
        loan_limit = 0
        if loan_eligible and year > 3:
            # For year 4, we use balance at end of year 2
            loan_limit = yearly_details[year-4]['closing_balance'] * 0.25 if year-4 >= 0 else 0
        
        # Calculate withdrawal limit if eligible
        withdrawal_limit = 0
        if withdrawal_eligible:
            # 50% of balance at end of 4th preceding year
            withdrawal_limit = yearly_details[year-5]['closing_balance'] * 0.5 if year-5 >= 0 else 0
        
        yearly_details.append({
            'year': year,
            'opening_balance': opening_balance,
            'investment': annual_investment,
            'interest': interest,
            'closing_balance': balance,
            'loan_eligible': loan_eligible,
            'loan_limit': loan_limit if loan_eligible else 0,
            'withdrawal_eligible': withdrawal_eligible,
            'withdrawal_limit': withdrawal_limit if withdrawal_eligible else 0
        })
    
    maturity_amount = balance
    total_investment = annual_investment * years
    total_interest = maturity_amount - total_investment
    
    return maturity_amount, total_investment, total_interest, yearly_details

@st.cache_data
def calculate_fd(principal, interest_rate, tenure_years, compounding_frequency=4):
    """Calculate Fixed Deposit returns"""
    # Compounding frequency: 1=annual, 4=quarterly, 12=monthly
    periods = tenure_years * compounding_frequency
    rate_per_period = interest_rate / (100 * compounding_frequency)
    
    maturity_amount = principal * ((1 + rate_per_period) ** periods)
    interest_earned = maturity_amount - principal
    
    return maturity_amount, interest_earned

@st.cache_data
def calculate_term_insurance(age, annual_income, liabilities, dependent_years, existing_coverage=0, savings=0, investment_assets=0, income_replacement=0.6, expense_multiple=300, method="income_replacement"):
    """
    Calculate adequate term insurance coverage based on different methods
    
    Args:
        age: Current age of the individual
        annual_income: Annual income before tax
        liabilities: Outstanding loans and liabilities
        dependent_years: Number of years dependents will rely on the income
        existing_coverage: Existing term insurance coverage (if any)
        savings: Current liquid savings
        investment_assets: Current investment assets (excluding real estate)
        income_replacement: Percentage of income to be replaced (0.5 to 0.7 typically)
        expense_multiple: Multiple of annual expenses for Human Life Value method
        method: Calculation method ("income_replacement", "income_multiple", "human_life_value")
        
    Returns:
        Dictionary containing coverage recommendations, rationale and detailed breakdown
    """
    results = {}
    
    # Method 1: Income Replacement Method
    monthly_income = annual_income / 12
    years_to_retirement = min(60 - age, dependent_years) if age < 60 else 0
    if years_to_retirement <= 0:
        income_replacement_value = 0
    else:
        # Calculate present value of future income stream
        # Assuming 7% interest rate and 5% inflation, net discount rate is ~2%
        discount_rate = 0.02
        
        # Formula for present value of future income stream
        # PV = PMT * ((1 - (1 + r)^-n) / r)
        if discount_rate > 0:
            income_replacement_value = (monthly_income * income_replacement * 12) * (
                (1 - (1 + discount_rate) ** -years_to_retirement) / discount_rate
            )
        else:
            income_replacement_value = (monthly_income * income_replacement * 12) * years_to_retirement
            
    # Add liabilities to the required coverage
    income_replacement_coverage = income_replacement_value + liabilities
    
    # Deduct existing assets
    income_replacement_coverage = max(0, income_replacement_coverage - savings - investment_assets - existing_coverage)
    
    # Round to nearest lakh
    income_replacement_coverage = round(income_replacement_coverage / 100000) * 100000
    
    # Method 2: Income Multiple Method (10-15x annual income)
    income_multiple = 10 if age <= 30 else (
        15 if age <= 40 else (
            12 if age <= 50 else 10
        )
    )
    
    income_multiple_coverage = annual_income * income_multiple
    income_multiple_coverage = max(0, income_multiple_coverage - existing_coverage)
    income_multiple_coverage = round(income_multiple_coverage / 100000) * 100000
    
    # Method 3: Human Life Value Method
    annual_expenses = annual_income * 0.7  # Assuming 70% of income goes to expenses
    hlv_base = annual_expenses * expense_multiple / 100  # Convert expense_multiple from percentage
    
    # Adjust for age (younger age means more coverage)
    age_factor = 1.2 if age < 30 else (
        1 if age < 40 else (
            0.8 if age < 50 else 0.6
        )
    )
    
    hlv_coverage = hlv_base * age_factor
    hlv_coverage = max(0, hlv_coverage - existing_coverage)
    hlv_coverage = round(hlv_coverage / 100000) * 100000
    
    # Store all method results for comparison
    results["income_replacement"] = {
        "coverage": income_replacement_coverage,
        "description": f"{income_replacement*100:.0f}% income replacement for {years_to_retirement} years + liabilities - assets",
        "formula": f"({monthly_income:,.0f} × {income_replacement:.1f} × 12 × PV factor for {years_to_retirement} years) + {liabilities:,.0f} - {savings + investment_assets:,.0f} - {existing_coverage:,.0f}",
        "breakdown": {
            "future_income_pv": income_replacement_value,
            "liabilities": liabilities,
            "assets_deducted": savings + investment_assets + existing_coverage,
            "years_considered": years_to_retirement,
            "income_percentage": income_replacement
        }
    }
    
    results["income_multiple"] = {
        "coverage": income_multiple_coverage,
        "description": f"{income_multiple}x annual income - existing coverage",
        "formula": f"{annual_income:,.0f} × {income_multiple} - {existing_coverage:,.0f}",
        "breakdown": {
            "income_multiple_used": income_multiple,
            "annual_income": annual_income,
            "existing_coverage": existing_coverage
        }
    }
    
    results["human_life_value"] = {
        "coverage": hlv_coverage,
        "description": f"{expense_multiple}x monthly expenses adjusted for age",
        "formula": f"({annual_income:,.0f} × 0.7 × {expense_multiple/100:.1f}) × {age_factor:.1f} - {existing_coverage:,.0f}",
        "breakdown": {
            "annual_expenses": annual_expenses,
            "expense_multiple": expense_multiple/100,
            "age_factor": age_factor,
            "existing_coverage": existing_coverage
        }
    }
    
    # Determine recommended coverage based on selected method
    if method == "income_replacement":
        recommended_coverage = income_replacement_coverage
        method_description = "Income Replacement Method"
    elif method == "income_multiple":
        recommended_coverage = income_multiple_coverage
        method_description = "Income Multiple Method"
    elif method == "human_life_value":
        recommended_coverage = hlv_coverage
        method_description = "Human Life Value Method"
    
    # Additional insights
    recommendations = []
    
    if age < 30:
        recommendations.append("Consider longer policy term (up to age 60-65) for cost efficiency")
    
    if liabilities > annual_income * 5:
        recommendations.append("High debt ratio detected. Consider separate mortgage protection insurance")
    
    if dependent_years > 0 and dependent_years < 10:
        recommendations.append("Short-term dependency detected. Consider decreasing term coverage")
    
    if annual_income > 2500000:
        recommendations.append("Higher income detected. Consider critical illness and disability riders")
    
    if existing_coverage > 0 and existing_coverage < recommended_coverage * 0.5:
        recommendations.append("Significant coverage gap detected. Consider increasing coverage")
    
    results["recommended"] = {
        "coverage": recommended_coverage,
        "method": method_description,
        "recommendations": recommendations
    }
    
    # Premium estimate (approximation based on average term rates)
    # These are rough estimates - actual premiums will vary by insurer
    base_premium_per_lakh = 0
    
    if age < 30:
        base_premium_per_lakh = 600
    elif age < 35:
        base_premium_per_lakh = 700
    elif age < 40:
        base_premium_per_lakh = 850
    elif age < 45:
        base_premium_per_lakh = 1100
    elif age < 50:
        base_premium_per_lakh = 1600
    elif age < 55:
        base_premium_per_lakh = 2400
    else:
        base_premium_per_lakh = 3500
    
    # Adjust for policy term
    policy_term = min(60 - age, dependent_years) if age < 60 else 0
    term_factor = 1.0
    
    if policy_term > 30:
        term_factor = 1.3
    elif policy_term > 25:
        term_factor = 1.2
    elif policy_term > 20:
        term_factor = 1.1
    elif policy_term < 15:
        term_factor = 0.9
    
    coverage_in_lakhs = recommended_coverage / 100000
    annual_premium_estimate = base_premium_per_lakh * coverage_in_lakhs * term_factor
    monthly_premium_estimate = annual_premium_estimate / 12
    
    results["premium_estimate"] = {
        "annual": annual_premium_estimate,
        "monthly": monthly_premium_estimate,
        "parameters": {
            "age": age,
            "coverage_in_lakhs": coverage_in_lakhs,
            "policy_term": policy_term,
            "base_premium_per_lakh": base_premium_per_lakh,
            "term_factor": term_factor
        }
    }
    
    # Return complete results
    return results

@st.cache_data
def calculate_yes_bank_fd(principal, interest_rate, tenure_days, payout_frequency="At Maturity", senior_citizen=False, tax_saving=False, nre_account=False, yes_premia=False, yes_first=False):
    """
    Calculate Yes Bank Fixed Deposit returns
    
    Args:
        principal: Principal amount invested (Min: 10000)
        interest_rate: Annual interest rate (%)
        tenure_days: Tenure in days
        payout_frequency: Interest payout frequency ("At Maturity", "Monthly", "Quarterly", "Half-Yearly", "Yearly")
        senior_citizen: Whether the investor is a senior citizen (gets 0.5% additional interest)
        tax_saving: Whether it's a tax-saving FD (5-year lock-in with 80C benefits)
        nre_account: Whether the deposit is in an NRE account (tax-free interest for NRIs)
        yes_premia: Whether the investor is a Yes Premia customer (gets 0.1% additional interest)
        yes_first: Whether the investor is a Yes First customer (gets 0.25% additional interest)
        
    Returns:
        Tuple containing (maturity_amount, interest_earned, effective_rate, periodic_payout, growth_details, tax_savings, nre_tax_benefit)
    """
    # Apply special rates based on depositor category
    effective_rate = interest_rate
    
    # Special customer category benefits
    if yes_first:
        effective_rate += 0.25  # 0.25% additional for Yes First customers
    elif yes_premia:
        effective_rate += 0.1  # 0.1% additional for Yes Premia customers
    
    # Senior citizen benefit
    if senior_citizen:
        effective_rate += 0.5  # 0.5% additional for senior citizens
    
    # Convert tenure to years for calculations
    tenure_years = tenure_days / 365.25
    
    # Define compounding frequency based on payout frequency
    compounding_map = {
        "At Maturity": 1,  # Annual compounding for maturity payout
        "Yearly": 1,
        "Half-Yearly": 2,
        "Quarterly": 4,
        "Monthly": 12
    }
    
    compounding_frequency = compounding_map[payout_frequency]
    
    # For payout options other than at maturity, interest is paid out and not compounded
    if payout_frequency == "At Maturity":
        # Calculate with compound interest
        rate_per_period = effective_rate / (100 * compounding_frequency)
        periods = tenure_years * compounding_frequency
        
        maturity_amount = principal * ((1 + rate_per_period) ** periods)
        interest_earned = maturity_amount - principal
        periodic_payout = 0  # No periodic payout
    else:
        # Calculate with simple interest for periodic payouts
        annual_interest = principal * (effective_rate / 100)
        
        # Calculate periodic payout based on frequency
        if payout_frequency == "Monthly":
            periodic_payout = annual_interest / 12
        elif payout_frequency == "Quarterly":
            periodic_payout = annual_interest / 4
        elif payout_frequency == "Half-Yearly":
            periodic_payout = annual_interest / 2
        else:  # Yearly
            periodic_payout = annual_interest
        
        # Total interest earned
        interest_earned = annual_interest * tenure_years
        maturity_amount = principal  # Principal is returned at maturity
    
    # Generate growth details
    growth_details = []
    current_value = principal
    periods_total = int(tenure_years * compounding_frequency)
    
    if payout_frequency == "At Maturity":
        # Compound interest growth
        for period in range(1, periods_total + 1):
            opening_balance = current_value
            interest = opening_balance * rate_per_period
            current_value = opening_balance + interest
            
            growth_details.append({
                'period': period,
                'period_type': f"{12//compounding_frequency} months",
                'opening_balance': opening_balance,
                'interest': interest,
                'payout': 0,
                'closing_balance': current_value
            })
    else:
        # Simple interest with periodic payouts
        period_length_months = 12 // compounding_frequency
        for period in range(1, periods_total + 1):
            opening_balance = principal  # Balance remains constant
            interest = periodic_payout
            
            growth_details.append({
                'period': period,
                'period_type': f"{period_length_months} months",
                'opening_balance': opening_balance,
                'interest': interest,
                'payout': interest,
                'closing_balance': opening_balance  # Unchanged
            })
    
    # Calculate additional details for tax-saving FD
    tax_savings = 0
    if tax_saving:
        # Assuming 30% tax bracket for maximum savings
        tax_savings = min(principal, 150000) * 0.3
    
    # NRE account benefit
    nre_tax_benefit = 0
    if nre_account:
        # Interest income is tax-free for NRE accounts
        nre_tax_benefit = interest_earned * 0.3  # Assuming 30% tax bracket
    
    return maturity_amount, interest_earned, effective_rate, periodic_payout, growth_details, tax_savings if tax_saving else None, nre_tax_benefit if nre_account else None

@st.cache_data
def calculate_kotak_fd(principal, interest_rate, tenure_days, payout_frequency="At Maturity", senior_citizen=False, tax_saving=False, nre_account=False, digital_fd=False):
    """
    Calculate Kotak Mahindra Bank Fixed Deposit returns
    
    Args:
        principal: Principal amount invested (Min: 5000)
        interest_rate: Annual interest rate (%)
        tenure_days: Tenure in days
        payout_frequency: Interest payout frequency ("At Maturity", "Monthly", "Quarterly", "Half-Yearly", "Yearly")
        senior_citizen: Whether the investor is a senior citizen (gets 0.5% additional interest)
        tax_saving: Whether it's a tax-saving FD (5-year lock-in with 80C benefits)
        nre_account: Whether the deposit is in an NRE account (tax-free interest for NRIs)
        digital_fd: Whether the FD is booked through digital channels (gets 0.1% additional interest)
        
    Returns:
        Tuple containing (maturity_amount, interest_earned, effective_rate, periodic_payout, growth_details, tax_savings, nre_tax_benefit)
    """
    # Apply special rates based on depositor category
    effective_rate = interest_rate
    
    # Digital channel benefit
    if digital_fd:
        effective_rate += 0.1  # 0.1% additional for digital bookings
    
    # Senior citizen benefit
    if senior_citizen:
        effective_rate += 0.5  # 0.5% additional for senior citizens
    
    # Convert tenure to years for calculations
    tenure_years = tenure_days / 365.25
    
    # Define compounding frequency based on payout frequency
    compounding_map = {
        "At Maturity": 1,  # Annual compounding for maturity payout
        "Yearly": 1,
        "Half-Yearly": 2,
        "Quarterly": 4,
        "Monthly": 12
    }
    
    compounding_frequency = compounding_map[payout_frequency]
    
    # For payout options other than at maturity, interest is paid out and not compounded
    if payout_frequency == "At Maturity":
        # Calculate with compound interest
        rate_per_period = effective_rate / (100 * compounding_frequency)
        periods = tenure_years * compounding_frequency
        
        maturity_amount = principal * ((1 + rate_per_period) ** periods)
        interest_earned = maturity_amount - principal
        periodic_payout = 0  # No periodic payout
    else:
        # Calculate with simple interest for periodic payouts
        annual_interest = principal * (effective_rate / 100)
        
        # Calculate periodic payout based on frequency
        if payout_frequency == "Monthly":
            periodic_payout = annual_interest / 12
        elif payout_frequency == "Quarterly":
            periodic_payout = annual_interest / 4
        elif payout_frequency == "Half-Yearly":
            periodic_payout = annual_interest / 2
        else:  # Yearly
            periodic_payout = annual_interest
        
        # Total interest earned
        interest_earned = annual_interest * tenure_years
        maturity_amount = principal  # Principal is returned at maturity
    
    # Generate growth details
    growth_details = []
    current_value = principal
    periods_total = int(tenure_years * compounding_frequency)
    
    if payout_frequency == "At Maturity":
        # Compound interest growth
        for period in range(1, periods_total + 1):
            opening_balance = current_value
            interest = opening_balance * rate_per_period
            current_value = opening_balance + interest
            
            growth_details.append({
                'period': period,
                'period_type': f"{12//compounding_frequency} months",
                'opening_balance': opening_balance,
                'interest': interest,
                'payout': 0,
                'closing_balance': current_value
            })
    else:
        # Simple interest with periodic payouts
        period_length_months = 12 // compounding_frequency
        for period in range(1, periods_total + 1):
            opening_balance = principal  # Balance remains constant
            interest = periodic_payout
            
            growth_details.append({
                'period': period,
                'period_type': f"{period_length_months} months",
                'opening_balance': opening_balance,
                'interest': interest,
                'payout': interest,
                'closing_balance': opening_balance  # Unchanged
            })
    
    # Calculate additional details for tax-saving FD
    tax_savings = 0
    if tax_saving:
        # Assuming 30% tax bracket for maximum savings
        tax_savings = min(principal, 150000) * 0.3
    
    # NRE account benefit
    nre_tax_benefit = 0
    if nre_account:
        # Interest income is tax-free for NRE accounts
        nre_tax_benefit = interest_earned * 0.3  # Assuming 30% tax bracket
    
    return maturity_amount, interest_earned, effective_rate, periodic_payout, growth_details, tax_savings if tax_saving else None, nre_tax_benefit if nre_account else None

@st.cache_data
def calculate_axis_fd(principal, interest_rate, tenure_days, payout_frequency="At Maturity", senior_citizen=False, tax_saving=False, nre_account=False, woman_depositor=False, staff_special_rate=False):
    """
    Calculate Axis Bank Fixed Deposit returns
    
    Args:
        principal: Principal amount invested (Min: 5000)
        interest_rate: Annual interest rate (%)
        tenure_days: Tenure in days
        payout_frequency: Interest payout frequency ("At Maturity", "Monthly", "Quarterly", "Half-Yearly", "Yearly")
        senior_citizen: Whether the investor is a senior citizen (gets 0.5% additional interest)
        tax_saving: Whether it's a tax-saving FD (5-year lock-in with 80C benefits)
        nre_account: Whether the deposit is in an NRE account (tax-free interest for NRIs)
        woman_depositor: Whether the depositor is a woman (gets 0.1% additional interest in some schemes)
        staff_special_rate: Whether the depositor is a staff member (gets 1% additional interest)
        
    Returns:
        Tuple containing (maturity_amount, interest_earned, effective_rate, periodic_payout, growth_details, tax_savings, nre_tax_benefit)
    """
    # Apply special rates based on depositor category
    effective_rate = interest_rate
    
    if staff_special_rate:
        effective_rate += 1.0  # 1% additional for bank staff
    elif senior_citizen:
        effective_rate += 0.5  # 0.5% additional for senior citizens
    
    if woman_depositor and not staff_special_rate:  # Staff rate overrides woman rate
        effective_rate += 0.1  # 0.1% additional for women depositors
    
    # Convert tenure to years for calculations
    tenure_years = tenure_days / 365.25
    
    # Define compounding frequency based on payout frequency
    compounding_map = {
        "At Maturity": 1,  # Annual compounding for maturity payout
        "Yearly": 1,
        "Half-Yearly": 2,
        "Quarterly": 4,
        "Monthly": 12
    }
    
    compounding_frequency = compounding_map[payout_frequency]
    
    # For payout options other than at maturity, interest is paid out and not compounded
    if payout_frequency == "At Maturity":
        # Calculate with compound interest
        rate_per_period = effective_rate / (100 * compounding_frequency)
        periods = tenure_years * compounding_frequency
        
        maturity_amount = principal * ((1 + rate_per_period) ** periods)
        interest_earned = maturity_amount - principal
        periodic_payout = 0  # No periodic payout
    else:
        # Calculate with simple interest for periodic payouts
        annual_interest = principal * (effective_rate / 100)
        
        # Calculate periodic payout based on frequency
        if payout_frequency == "Monthly":
            periodic_payout = annual_interest / 12
        elif payout_frequency == "Quarterly":
            periodic_payout = annual_interest / 4
        elif payout_frequency == "Half-Yearly":
            periodic_payout = annual_interest / 2
        else:  # Yearly
            periodic_payout = annual_interest
        
        # Total interest earned
        interest_earned = annual_interest * tenure_years
        maturity_amount = principal  # Principal is returned at maturity
    
    # Generate growth details
    growth_details = []
    current_value = principal
    periods_total = int(tenure_years * compounding_frequency)
    
    if payout_frequency == "At Maturity":
        # Compound interest growth
        for period in range(1, periods_total + 1):
            opening_balance = current_value
            interest = opening_balance * rate_per_period
            current_value = opening_balance + interest
            
            growth_details.append({
                'period': period,
                'period_type': f"{12//compounding_frequency} months",
                'opening_balance': opening_balance,
                'interest': interest,
                'payout': 0,
                'closing_balance': current_value
            })
    else:
        # Simple interest with periodic payouts
        period_length_months = 12 // compounding_frequency
        for period in range(1, periods_total + 1):
            opening_balance = principal  # Balance remains constant
            interest = periodic_payout
            
            growth_details.append({
                'period': period,
                'period_type': f"{period_length_months} months",
                'opening_balance': opening_balance,
                'interest': interest,
                'payout': interest,
                'closing_balance': opening_balance  # Unchanged
            })
    
    # Calculate additional details for tax-saving FD
    tax_savings = 0
    if tax_saving:
        # Assuming 30% tax bracket for maximum savings
        tax_savings = min(principal, 150000) * 0.3
    
    # NRE account benefit
    nre_tax_benefit = 0
    if nre_account:
        # Interest income is tax-free for NRE accounts
        nre_tax_benefit = interest_earned * 0.3  # Assuming 30% tax bracket
    
    # Calculate loyalty bonus if applicable (for renewals)
    loyalty_bonus = 0
    loyalty_bonus_text = ""
    
    return maturity_amount, interest_earned, effective_rate, periodic_payout, growth_details, tax_savings if tax_saving else None, nre_tax_benefit if nre_account else None, loyalty_bonus, loyalty_bonus_text

@st.cache_data
def calculate_icici_fd(principal, interest_rate, tenure_days, payout_frequency="At Maturity", senior_citizen=False, tax_saving=False, nre_account=False):
    """
    Calculate ICICI Bank Fixed Deposit returns
    
    Args:
        principal: Principal amount invested (Min: 10000)
        interest_rate: Annual interest rate (%)
        tenure_days: Tenure in days
        payout_frequency: Interest payout frequency ("At Maturity", "Monthly", "Quarterly", "Half-Yearly", "Yearly")
        senior_citizen: Whether the investor is a senior citizen (gets 0.5% additional interest)
        tax_saving: Whether it's a tax-saving FD (5-year lock-in with 80C benefits)
        nre_account: Whether the deposit is in an NRE account (tax-free interest for NRIs)
        
    Returns:
        Tuple containing (maturity_amount, interest_earned, effective_rate, periodic_payout, growth_details)
    """
    # Apply senior citizen additional interest if applicable
    effective_rate = interest_rate
    if senior_citizen:
        effective_rate += 0.5  # 0.5% additional for senior citizens
    
    # Convert tenure to years for calculations
    tenure_years = tenure_days / 365.25
    
    # Define compounding frequency based on payout frequency
    compounding_map = {
        "At Maturity": 1,  # Annual compounding for maturity payout
        "Yearly": 1,
        "Half-Yearly": 2,
        "Quarterly": 4,
        "Monthly": 12
    }
    
    compounding_frequency = compounding_map[payout_frequency]
    
    # For payout options other than at maturity, interest is paid out and not compounded
    if payout_frequency == "At Maturity":
        # Calculate with compound interest
        rate_per_period = effective_rate / (100 * compounding_frequency)
        periods = tenure_years * compounding_frequency
        
        maturity_amount = principal * ((1 + rate_per_period) ** periods)
        interest_earned = maturity_amount - principal
        periodic_payout = 0  # No periodic payout
    else:
        # Calculate with simple interest for periodic payouts
        annual_interest = principal * (effective_rate / 100)
        
        # Calculate periodic payout based on frequency
        if payout_frequency == "Monthly":
            periodic_payout = annual_interest / 12
        elif payout_frequency == "Quarterly":
            periodic_payout = annual_interest / 4
        elif payout_frequency == "Half-Yearly":
            periodic_payout = annual_interest / 2
        else:  # Yearly
            periodic_payout = annual_interest
        
        # Total interest earned
        interest_earned = annual_interest * tenure_years
        maturity_amount = principal  # Principal is returned at maturity
    
    # Generate growth details
    growth_details = []
    current_value = principal
    periods_total = int(tenure_years * compounding_frequency)
    
    if payout_frequency == "At Maturity":
        # Compound interest growth
        for period in range(1, periods_total + 1):
            opening_balance = current_value
            interest = opening_balance * rate_per_period
            current_value = opening_balance + interest
            
            growth_details.append({
                'period': period,
                'period_type': f"{12//compounding_frequency} months",
                'opening_balance': opening_balance,
                'interest': interest,
                'payout': 0,
                'closing_balance': current_value
            })
    else:
        # Simple interest with periodic payouts
        period_length_months = 12 // compounding_frequency
        for period in range(1, periods_total + 1):
            opening_balance = principal  # Balance remains constant
            interest = periodic_payout
            
            growth_details.append({
                'period': period,
                'period_type': f"{period_length_months} months",
                'opening_balance': opening_balance,
                'interest': interest,
                'payout': interest,
                'closing_balance': opening_balance  # Unchanged
            })
    
    # Calculate additional details for tax-saving FD
    tax_savings = 0
    if tax_saving:
        # Assuming 30% tax bracket for maximum savings
        tax_savings = min(principal, 150000) * 0.3
    
    # NRE account benefit
    nre_tax_benefit = 0
    if nre_account:
        # Interest income is tax-free for NRE accounts
        nre_tax_benefit = interest_earned * 0.3  # Assuming 30% tax bracket
    
    return maturity_amount, interest_earned, effective_rate, periodic_payout, growth_details, tax_savings if tax_saving else None, nre_tax_benefit if nre_account else None

@st.cache_data
def calculate_hdfc_fd(principal, interest_rate, tenure_days, payout_frequency="At Maturity", senior_citizen=False, tax_saving=False, super_senior=False):
    """
    Calculate HDFC Bank Fixed Deposit returns
    
    Args:
        principal: Principal amount invested (Min: 5000)
        interest_rate: Annual interest rate (%)
        tenure_days: Tenure in days
        payout_frequency: Interest payout frequency ("At Maturity", "Monthly", "Quarterly", "Half-Yearly", "Yearly")
        senior_citizen: Whether the investor is a senior citizen (gets 0.5% additional interest)
        super_senior: Whether the investor is a super senior citizen (80+ years, gets 0.75% additional interest)
        tax_saving: Whether it's a tax-saving FD (5-year lock-in with 80C benefits)
        
    Returns:
        Tuple containing (maturity_amount, interest_earned, effective_rate, periodic_payout, growth_details)
    """
    # Apply senior citizen or super senior additional interest if applicable
    effective_rate = interest_rate
    if super_senior:
        effective_rate += 0.75  # 0.75% additional for super senior citizens (80+ years)
    elif senior_citizen:
        effective_rate += 0.5  # 0.5% additional for senior citizens
    
    # Convert tenure to years for calculations
    tenure_years = tenure_days / 365.25
    
    # Define compounding frequency based on payout frequency
    compounding_map = {
        "At Maturity": 1,  # Annual compounding for maturity payout
        "Yearly": 1,
        "Half-Yearly": 2,
        "Quarterly": 4,
        "Monthly": 12
    }
    
    compounding_frequency = compounding_map[payout_frequency]
    
    # For payout options other than at maturity, interest is paid out and not compounded
    if payout_frequency == "At Maturity":
        # Calculate with compound interest
        rate_per_period = effective_rate / (100 * compounding_frequency)
        periods = tenure_years * compounding_frequency
        
        maturity_amount = principal * ((1 + rate_per_period) ** periods)
        interest_earned = maturity_amount - principal
        periodic_payout = 0  # No periodic payout
    else:
        # Calculate with simple interest for periodic payouts
        annual_interest = principal * (effective_rate / 100)
        
        # Calculate periodic payout based on frequency
        if payout_frequency == "Monthly":
            periodic_payout = annual_interest / 12
        elif payout_frequency == "Quarterly":
            periodic_payout = annual_interest / 4
        elif payout_frequency == "Half-Yearly":
            periodic_payout = annual_interest / 2
        else:  # Yearly
            periodic_payout = annual_interest
        
        # Total interest earned
        interest_earned = annual_interest * tenure_years
        maturity_amount = principal  # Principal is returned at maturity
    
    # Generate growth details
    growth_details = []
    current_value = principal
    periods_total = int(tenure_years * compounding_frequency)
    
    if payout_frequency == "At Maturity":
        # Compound interest growth
        for period in range(1, periods_total + 1):
            opening_balance = current_value
            interest = opening_balance * rate_per_period
            current_value = opening_balance + interest
            
            growth_details.append({
                'period': period,
                'period_type': f"{12//compounding_frequency} months",
                'opening_balance': opening_balance,
                'interest': interest,
                'payout': 0,
                'closing_balance': current_value
            })
    else:
        # Simple interest with periodic payouts
        period_length_months = 12 // compounding_frequency
        for period in range(1, periods_total + 1):
            opening_balance = principal  # Balance remains constant
            interest = periodic_payout
            
            growth_details.append({
                'period': period,
                'period_type': f"{period_length_months} months",
                'opening_balance': opening_balance,
                'interest': interest,
                'payout': interest,
                'closing_balance': opening_balance  # Unchanged
            })
    
    # Calculate additional details for tax-saving FD
    tax_savings = 0
    if tax_saving:
        # Assuming 30% tax bracket for maximum savings
        tax_savings = min(principal, 150000) * 0.3
    
    return maturity_amount, interest_earned, effective_rate, periodic_payout, growth_details, tax_savings if tax_saving else None

@st.cache_data
def calculate_sbi_fd(principal, interest_rate, tenure_days, payout_frequency="At Maturity", senior_citizen=False, tax_saving=False):
    """
    Calculate SBI Fixed Deposit returns
    
    Args:
        principal: Principal amount invested (Min: 1000)
        interest_rate: Annual interest rate (%)
        tenure_days: Tenure in days
        payout_frequency: Interest payout frequency ("At Maturity", "Monthly", "Quarterly", "Half-Yearly", "Yearly")
        senior_citizen: Whether the investor is a senior citizen (gets 0.5% additional interest)
        tax_saving: Whether it's a tax-saving FD (5-year lock-in with 80C benefits)
        
    Returns:
        Tuple containing (maturity_amount, interest_earned, effective_rate, periodic_payout, growth_details)
    """
    # Apply senior citizen additional interest if applicable
    effective_rate = interest_rate
    if senior_citizen:
        effective_rate += 0.5  # 0.5% additional for senior citizens
    
    # Convert tenure to years for calculations
    tenure_years = tenure_days / 365.25
    
    # Define compounding frequency based on payout frequency
    compounding_map = {
        "At Maturity": 1,  # Annual compounding for maturity payout
        "Yearly": 1,
        "Half-Yearly": 2,
        "Quarterly": 4,
        "Monthly": 12
    }
    
    compounding_frequency = compounding_map[payout_frequency]
    
    # For payout options other than at maturity, interest is paid out and not compounded
    if payout_frequency == "At Maturity":
        # Calculate with compound interest
        rate_per_period = effective_rate / (100 * compounding_frequency)
        periods = tenure_years * compounding_frequency
        
        maturity_amount = principal * ((1 + rate_per_period) ** periods)
        interest_earned = maturity_amount - principal
        periodic_payout = 0  # No periodic payout
    else:
        # Calculate with simple interest for periodic payouts
        annual_interest = principal * (effective_rate / 100)
        
        # Calculate periodic payout based on frequency
        if payout_frequency == "Monthly":
            periodic_payout = annual_interest / 12
        elif payout_frequency == "Quarterly":
            periodic_payout = annual_interest / 4
        elif payout_frequency == "Half-Yearly":
            periodic_payout = annual_interest / 2
        else:  # Yearly
            periodic_payout = annual_interest
        
        # Total interest earned
        interest_earned = annual_interest * tenure_years
        maturity_amount = principal  # Principal is returned at maturity
    
    # Generate growth details
    growth_details = []
    current_value = principal
    periods_total = int(tenure_years * compounding_frequency)
    
    if payout_frequency == "At Maturity":
        # Compound interest growth
        for period in range(1, periods_total + 1):
            opening_balance = current_value
            interest = opening_balance * rate_per_period
            current_value = opening_balance + interest
            
            growth_details.append({
                'period': period,
                'period_type': f"{12//compounding_frequency} months",
                'opening_balance': opening_balance,
                'interest': interest,
                'payout': 0,
                'closing_balance': current_value
            })
    else:
        # Simple interest with periodic payouts
        period_length_months = 12 // compounding_frequency
        for period in range(1, periods_total + 1):
            opening_balance = principal  # Balance remains constant
            interest = periodic_payout
            
            growth_details.append({
                'period': period,
                'period_type': f"{period_length_months} months",
                'opening_balance': opening_balance,
                'interest': interest,
                'payout': interest,
                'closing_balance': opening_balance  # Unchanged
            })
    
    # Calculate additional details for tax-saving FD
    tax_savings = 0
    if tax_saving:
        # Assuming 30% tax bracket for maximum savings
        tax_savings = min(principal, 150000) * 0.3
    
    return maturity_amount, interest_earned, effective_rate, periodic_payout, growth_details, tax_savings if tax_saving else None

@st.cache_data
def calculate_post_office_mis(principal, interest_rate, tenure_years=5, senior_citizen=False):
    """
    Calculate Post Office Monthly Income Scheme (MIS) returns
    
    Args:
        principal: Principal amount invested (Min: 1000, Max: 4.5 lakhs for single, 9 lakhs for joint account)
        interest_rate: Annual interest rate (%)
        tenure_years: Tenure in years (fixed at 5 years for Post Office MIS)
        senior_citizen: Whether the investor is a senior citizen (gets 0.5% additional interest)
        
    Returns:
        Tuple containing (monthly_income, total_income, maturity_amount, effective_rate, monthly_details)
    """
    # Apply senior citizen additional interest if applicable
    effective_rate = interest_rate
    if senior_citizen:
        effective_rate += 0.5  # 0.5% additional for senior citizens
    
    # Calculate monthly income (principal * annual rate / 12)
    monthly_income = principal * (effective_rate / 100) / 12
    
    # Calculate total income over the tenure
    total_months = tenure_years * 12
    total_income = monthly_income * total_months
    
    # Maturity amount equals principal (no compound interest, just monthly payouts)
    maturity_amount = principal
    
    # Generate monthly details
    monthly_details = []
    for month in range(1, total_months + 1):
        year = (month - 1) // 12 + 1
        month_in_year = (month - 1) % 12 + 1
        
        monthly_details.append({
            'month': month,
            'year': year,
            'month_in_year': month_in_year,
            'monthly_income': monthly_income,
            'cumulative_income': monthly_income * month,
            'principal_balance': principal  # Constant throughout
        })
    
    return monthly_income, total_income, maturity_amount, effective_rate, monthly_details

@st.cache_data
def calculate_post_office_rd(monthly_investment, interest_rate, tenure_months, senior_citizen=False):
    """
    Calculate Post Office Recurring Deposit (RD) returns
    
    Args:
        monthly_investment: Monthly investment amount (Min: 100)
        interest_rate: Annual interest rate (%)
        tenure_months: Tenure in months (must be in multiples of 12, between 12 and 120)
        senior_citizen: Whether the investor is a senior citizen (gets 0.5% additional interest)
        
    Returns:
        Tuple containing (maturity_amount, total_investment, interest_earned, effective_rate, monthly_details)
    """
    # Apply senior citizen additional interest if applicable
    effective_rate = interest_rate
    if senior_citizen:
        effective_rate += 0.5  # 0.5% additional for senior citizens
    
    # Convert annual rate to monthly
    monthly_rate = effective_rate / (12 * 100)
    
    # Initialize tracking variables
    total_investment = 0
    monthly_details = []
    current_value = 0
    
    # Calculate month by month growth
    for month in range(1, tenure_months + 1):
        # Add this month's deposit
        total_investment += monthly_investment
        
        # Calculate opening balance (previous month's closing balance)
        opening_balance = current_value
        
        # Add monthly deposit
        balance_after_deposit = opening_balance + monthly_investment
        
        # Calculate interest for the month
        # In Post Office RD, interest is calculated on end-of-month balance
        # For each completed month
        if month > 1:
            interest = opening_balance * monthly_rate
        else:
            interest = 0  # No interest in first month on the first deposit
        
        # Update current value
        current_value = balance_after_deposit + interest
        
        # Store monthly details
        monthly_details.append({
            'month': month,
            'opening_balance': opening_balance,
            'deposit': monthly_investment,
            'interest': interest,
            'closing_balance': current_value
        })
    
    maturity_amount = current_value
    interest_earned = maturity_amount - total_investment
    
    return maturity_amount, total_investment, interest_earned, effective_rate, monthly_details

@st.cache_data
def calculate_post_office_fd(principal, interest_rate, tenure_years, senior_citizen=False):
    """
    Calculate Post Office Fixed Deposit returns
    
    Args:
        principal: Principal amount invested
        interest_rate: Annual interest rate (%)
        tenure_years: Tenure in years (1, 2, 3, or 5 years)
        senior_citizen: Whether the investor is a senior citizen (gets 0.5% additional interest)
        
    Returns:
        Tuple containing (maturity_amount, interest_earned, effective_rate, quarterly_interest)
    """
    # Post Office FD has interest compounded quarterly but paid annually
    compounding_frequency = 4  # Quarterly compounding
    
    # Apply senior citizen additional interest if applicable
    effective_rate = interest_rate
    if senior_citizen:
        effective_rate += 0.5  # 0.5% additional for senior citizens
    
    # Periods for quarterly compounding
    periods = tenure_years * compounding_frequency
    rate_per_period = effective_rate / (100 * compounding_frequency)
    
    # Calculate maturity amount
    maturity_amount = principal * ((1 + rate_per_period) ** periods)
    interest_earned = maturity_amount - principal
    
    # Calculate quarterly interest (for quarterly payout option)
    quarterly_interest = principal * (effective_rate / 400)  # Principal * (rate/4)/100
    
    # Generate growth details
    growth_details = []
    current_value = principal
    
    for quarter in range(1, periods + 1):
        opening_balance = current_value
        interest = opening_balance * rate_per_period
        current_value = opening_balance + interest
        
        growth_details.append({
            'quarter': quarter,
            'opening_balance': opening_balance,
            'interest': interest,
            'closing_balance': current_value
        })
    
    return maturity_amount, interest_earned, effective_rate, quarterly_interest, growth_details

@st.cache_data
def calculate_rd(monthly_investment, interest_rate, tenure_months, compounding_frequency=4):
    """Calculate Recurring Deposit returns"""
    # Formula for RD: P * n * (1 + r/q)^(nq) - 1 / (1 + r/q)^(1/q) - 1
    # Where P = monthly installment, n = tenure in months, r = rate/100, q = compounding frequency
    
    r = interest_rate / 100
    q = compounding_frequency
    n = tenure_months / 12  # Convert months to years
    
    # For quarterly compounding in RD
    maturity_amount = monthly_investment * tenure_months * (1 + r/q)**(n*q)
    
    total_investment = monthly_investment * tenure_months
    interest_earned = maturity_amount - total_investment
    
    return maturity_amount, interest_earned, total_investment

@st.cache_data
def calculate_nps(monthly_contribution, expected_return, current_age, retirement_age=60):
    """Calculate National Pension System (NPS) returns"""
    years = retirement_age - current_age
    months = years * 12
    
    monthly_rate = expected_return / (12 * 100)
    
    # Calculate future value of monthly investments
    corpus = monthly_contribution * ((1 + monthly_rate) * (((1 + monthly_rate)**months - 1) / monthly_rate))
    
    # NPS rules: 60% can be withdrawn as lump sum, 40% must be used for annuity
    lump_sum = corpus * 0.6
    annuity = corpus * 0.4
    
    total_investment = monthly_contribution * months
    total_returns = corpus - total_investment
    
    return corpus, lump_sum, annuity, total_investment, total_returns

@st.cache_data
def calculate_apy(monthly_contribution, current_age, target_pension=1000):
    """
    Calculate Atal Pension Yojana (APY) projections and contributions
    
    Parameters:
    -----------
    monthly_contribution: float
        Monthly contribution amount
    current_age: int
        Current age of the subscriber
    target_pension: int
        Target monthly pension (1000, 2000, 3000, 4000, or 5000)
        
    Returns:
    --------
    tuple
        (monthly_pension, yearly_contribution, total_contribution, years_of_contribution, 
         corpus_at_60, return_on_investment, effective_roi_percentage)
    """
    # Validate target pension amount (APY has specific tiers only)
    valid_pension_tiers = [1000, 2000, 3000, 4000, 5000]
    if target_pension not in valid_pension_tiers:
        target_pension = min(valid_pension_tiers, key=lambda x: abs(x - target_pension))
    
    # Age-based contribution matrix for APY (approximated values)
    # Format: {target_pension: {age: yearly_contribution}}
    contribution_matrix = {
        1000: {
            18: 210, 20: 248, 25: 376, 30: 577, 35: 902, 40: 1454
        },
        2000: {
            18: 420, 20: 496, 25: 755, 30: 1155, 35: 1803, 40: 2908
        },
        3000: {
            18: 630, 20: 744, 25: 1132, 30: 1733, 35: 2705, 40: 4361
        },
        4000: {
            18: 840, 20: 992, 25: 1510, 30: 2310, 35: 3607, 40: 5815
        },
        5000: {
            18: 1050, 20: 1240, 25: 1888, 30: 2888, 35: 4509, 40: 7269
        }
    }
    
    # Interpolate for ages not explicitly in the matrix
    ages = sorted(list(contribution_matrix[target_pension].keys()))
    if current_age in ages:
        yearly_contribution = contribution_matrix[target_pension][current_age]
    else:
        # Find the closest age brackets
        lower_age = max([age for age in ages if age <= current_age], default=ages[0])
        upper_age = min([age for age in ages if age >= current_age], default=ages[-1])
        
        if lower_age == upper_age:
            yearly_contribution = contribution_matrix[target_pension][lower_age]
        else:
            # Linear interpolation for contribution
            lower_contrib = contribution_matrix[target_pension][lower_age]
            upper_contrib = contribution_matrix[target_pension][upper_age]
            
            # Calculate interpolated contribution
            age_range = upper_age - lower_age
            age_position = current_age - lower_age
            yearly_contribution = lower_contrib + (upper_contrib - lower_contrib) * (age_position / age_range)
            yearly_contribution = round(yearly_contribution)
    
    # Calculate total contribution until age 60
    years_of_contribution = 60 - current_age
    total_contribution = yearly_contribution * years_of_contribution
    
    # APY guarantees a fixed pension, so calculate corpus based on that
    # Assuming a 5% return rate for the annuity calculation
    annuity_rate = 0.05  # 5% p.a.
    # Corpus needed to provide the target pension indefinitely at 5% withdrawal rate
    corpus_at_60 = (target_pension * 12) / annuity_rate
    
    # Calculate return on investment
    return_on_investment = corpus_at_60 - total_contribution
    
    # Calculate effective ROI percentage
    effective_roi_percentage = (return_on_investment / total_contribution) * 100 if total_contribution > 0 else 0
    
    monthly_contribution = yearly_contribution / 12
    
    return (target_pension, yearly_contribution, total_contribution, years_of_contribution,
            corpus_at_60, return_on_investment, effective_roi_percentage, monthly_contribution)

@st.cache_data
def calculate_salary_details(basic_salary, hra, allowances, bonus, investments, rent_paid, metro_city, pf_contribution=0, 
                        professional_tax=2400, is_self_employed=False, standard_deduction=50000):
    """Calculate salary breakdown and tax details
    
    Args:
        basic_salary: Annual basic salary
        hra: Annual House Rent Allowance
        allowances: Annual other allowances (all taxable)
        bonus: Annual bonus/performance pay
        investments: Annual tax saving investments (up to 150000 under 80C)
        rent_paid: Annual rent paid for HRA exemption
        metro_city: Whether living in a metro city (for HRA exemption)
        pf_contribution: Annual employee PF contribution (default 0)
        professional_tax: Annual professional tax (default 2400)
        is_self_employed: Whether person is self-employed (default False)
        standard_deduction: Standard deduction amount (default 50000)
        
    Returns:
        Dictionary with salary, tax and take-home pay details
    """
    # Calculate annual gross salary
    gross_salary = basic_salary + hra + allowances + bonus
    
    # Calculate HRA exemption
    if rent_paid > 0:
        hra_exemption = min(
            hra,
            rent_paid - 0.1 * basic_salary,
            0.5 * basic_salary if metro_city else 0.4 * basic_salary
        )
        hra_exemption = max(0, hra_exemption)  # Ensure non-negative
    else:
        hra_exemption = 0
    
    # Ensure investments under 80C don't exceed limit
    tax_saving_investments = min(investments, 150000)
    
    # Calculate NPS deduction (up to 50000 in addition to 80C)
    nps_deduction = 0  # Can be added later if needed
    
    # Apply deductions
    # Standard deduction is applicable to all salaried individuals
    if not is_self_employed:
        deductions = standard_deduction
    else:
        deductions = 0
    
    deductions += tax_saving_investments + pf_contribution + nps_deduction + professional_tax
    
    # Calculate taxable income
    taxable_income = gross_salary - hra_exemption - deductions
    taxable_income = max(0, taxable_income)
    
    # Calculate tax under old regime
    def calculate_old_regime_tax(income):
        tax = 0
        if income > 1000000:
            tax += (income - 1000000) * 0.30
            income = 1000000
        if income > 500000:
            tax += (income - 500000) * 0.20
            income = 500000
        if income > 250000:
            tax += (income - 250000) * 0.05
        
        # Add 4% cess
        tax = tax * 1.04
        
        return tax
    
    # Calculate tax under new regime (2023-24)
    def calculate_new_regime_tax(income):
        tax = 0
        if income > 1500000:
            tax += (income - 1500000) * 0.30
            income = 1500000
        if income > 1200000:
            tax += (income - 1200000) * 0.20
            income = 1200000
        if income > 900000:
            tax += (income - 900000) * 0.15
            income = 900000
        if income > 600000:
            tax += (income - 600000) * 0.10
            income = 600000
        if income > 300000:
            tax += (income - 300000) * 0.05
            
        # Add 4% cess
        tax = tax * 1.04
        
        return tax
    
    # Calculate taxes under both regimes
    old_regime_tax = calculate_old_regime_tax(taxable_income)
    
    # For new regime, we need to calculate without standard deduction and 80C
    new_regime_taxable = gross_salary - hra_exemption - professional_tax
    new_regime_taxable = max(0, new_regime_taxable)
    new_regime_tax = calculate_new_regime_tax(new_regime_taxable)
    
    # Determine which regime is better
    if old_regime_tax <= new_regime_tax:
        optimal_regime = "Old Regime"
        tax_payable = old_regime_tax
        optimal_taxable_income = taxable_income
    else:
        optimal_regime = "New Regime"
        tax_payable = new_regime_tax
        optimal_taxable_income = new_regime_taxable
    
    # Calculate take home pay
    monthly_gross = gross_salary / 12
    monthly_tax = tax_payable / 12
    monthly_take_home = monthly_gross - monthly_tax - (professional_tax / 12) - (pf_contribution / 12)
    
    # Calculate tax savings if applicable
    tax_savings = max(0, abs(old_regime_tax - new_regime_tax))
    
    # Calculate effective tax rate
    effective_tax_rate = (tax_payable / gross_salary) * 100 if gross_salary > 0 else 0
    
    # Return detailed breakdown
    return {
        'gross_annual': gross_salary,
        'gross_monthly': monthly_gross,
        'taxable_income': optimal_taxable_income,
        'hra_exemption': hra_exemption,
        'tax_saving_investments': tax_saving_investments,
        'total_deductions': deductions,
        'tax_payable': tax_payable,
        'monthly_tax': monthly_tax,
        'monthly_take_home': monthly_take_home,
        'annual_take_home': monthly_take_home * 12,
        'optimal_regime': optimal_regime,
        'old_regime_tax': old_regime_tax,
        'new_regime_tax': new_regime_tax,
        'tax_savings': tax_savings,
        'effective_tax_rate': effective_tax_rate,
        'pf_contribution': pf_contribution
    }

def calculate_stp_returns(initial_amount, monthly_transfer, source_return, target_return, time_period_months):
    """Calculate Systematic Transfer Plan (STP) returns
    
    Args:
        initial_amount: Initial investment in source fund
        monthly_transfer: Amount to transfer monthly from source to target
        source_return: Expected annual return of source fund (%)
        target_return: Expected annual return of target fund (%)
        time_period_months: Duration of STP in months
        
    Returns:
        Dictionary with STP analysis results
    """
    # Convert annual returns to monthly
    source_monthly_return = (1 + source_return/100) ** (1/12) - 1
    target_monthly_return = (1 + target_return/100) ** (1/12) - 1
    
    # Initialize values
    source_fund = [initial_amount]
    target_fund = [0]
    total_value = [initial_amount]
    lumpsum_target = [initial_amount]  # For comparison: direct lumpsum in target fund
    
    # Run calculation for each month
    for month in range(1, time_period_months + 1):
        # Calculate source fund value after growth and transfer
        prev_source = source_fund[-1]
        source_growth = prev_source * source_monthly_return
        new_source = prev_source + source_growth - monthly_transfer
        
        # Ensure source fund doesn't go negative
        if new_source < 0:
            # Adjust final transfer if not enough funds
            monthly_transfer = prev_source + source_growth
            new_source = 0
        
        source_fund.append(max(0, new_source))
        
        # Calculate target fund value after transfer and growth
        prev_target = target_fund[-1]
        new_target = prev_target * (1 + target_monthly_return) + monthly_transfer
        target_fund.append(new_target)
        
        # Calculate total portfolio value
        total_value.append(new_source + new_target)
        
        # Calculate lumpsum alternative (if had invested all at once in target fund)
        lumpsum_target.append(initial_amount * (1 + target_monthly_return) ** month)
    
    # Calculate returns and other metrics
    total_transferred = monthly_transfer * time_period_months
    if total_transferred > initial_amount:
        total_transferred = initial_amount
        
    final_value = total_value[-1]
    absolute_return = final_value - initial_amount
    return_percentage = (absolute_return / initial_amount) * 100
    
    # Calculate CAGR
    time_years = time_period_months / 12
    cagr = ((final_value / initial_amount) ** (1 / time_years) - 1) * 100
    
    # Calculate lumpsum comparison
    lumpsum_final = lumpsum_target[-1]
    lumpsum_diff = final_value - lumpsum_final
    lumpsum_diff_percentage = (lumpsum_diff / lumpsum_final) * 100
    
    # Generate x-axis labels (months)
    months = list(range(time_period_months + 1))
    
    return {
        'source_fund': source_fund,
        'target_fund': target_fund,
        'total_value': total_value,
        'lumpsum_target': lumpsum_target,
        'months': months,
        'final_value': final_value,
        'absolute_return': absolute_return,
        'return_percentage': return_percentage,
        'cagr': cagr,
        'lumpsum_comparison': {
            'final_value': lumpsum_final,
            'difference': lumpsum_diff,
            'difference_percentage': lumpsum_diff_percentage
        }
    }

def calculate_mutual_fund_comparison(investment_amount, regular_expense_ratio, direct_expense_ratio, expected_return, time_period):
    """Compare regular and direct mutual fund returns"""
    # Convert percentages to decimals
    regular_expense = regular_expense_ratio / 100
    direct_expense = direct_expense_ratio / 100
    expected_return_decimal = expected_return / 100
    
    # Calculate net returns after expenses
    regular_net_return = expected_return_decimal - regular_expense
    direct_net_return = expected_return_decimal - direct_expense
    
    # Calculate future values
    regular_future_value = investment_amount * ((1 + regular_net_return) ** time_period)
    direct_future_value = investment_amount * ((1 + direct_net_return) ** time_period)
    
    # Calculate total returns
    regular_total_return = regular_future_value - investment_amount
    direct_total_return = direct_future_value - investment_amount
    
    # Calculate expense impact
    expense_impact = direct_future_value - regular_future_value
    expense_impact_percentage = (expense_impact / investment_amount) * 100
    
    # Generate yearly data for plotting
    years = list(range(time_period + 1))
    regular_values = [investment_amount * ((1 + regular_net_return) ** year) for year in years]
    direct_values = [investment_amount * ((1 + direct_net_return) ** year) for year in years]
    
    return {
        'regular_future_value': regular_future_value,
        'direct_future_value': direct_future_value,
        'regular_total_return': regular_total_return,
        'direct_total_return': direct_total_return,
        'expense_impact': expense_impact,
        'expense_impact_percentage': expense_impact_percentage,
        'years': years,
        'regular_values': regular_values,
        'direct_values': direct_values
    }

def show_stp_calculator():
    """Show the Systematic Transfer Plan (STP) calculator interface"""
    st.header("Systematic Transfer Plan (STP) Calculator")
    st.write("""
    STP is an investment strategy that involves transferring a fixed amount from one mutual fund to another at regular intervals.
    This calculator helps compare STP strategy with lumpsum investments and analyze potential benefits.
    """)
    
    st.info("""
    ### 💡 What is an STP?
    - **Systematic Transfer Plan (STP)** allows you to transfer money from one mutual fund to another at regular intervals
    - Typically used to move from low-risk funds (like liquid funds) to higher-risk funds (like equity) in a phased manner
    - Helps manage volatility and reduce risk through rupee-cost averaging
    - Allows your money to stay invested while gradually changing your asset allocation
    """)
    
    col1, col2 = st.columns(2)
    with col1:
        initial_amount = st.number_input(
            "Initial Investment in Source Fund (₹)",
            min_value=10000,
            value=1000000,
            step=10000,
            help="Amount initially invested in the source fund (typically a liquid or debt fund)"
        )
        time_period = st.number_input(
            "STP Duration (Months)",
            min_value=3,
            max_value=60,
            value=12,
            help="Number of months over which funds will be transferred"
        )
        monthly_transfer = st.number_input(
            "Monthly Transfer Amount (₹)",
            min_value=1000,
            max_value=initial_amount,
            value=min(initial_amount // time_period, 100000),
            step=1000,
            help="Amount transferred each month from source to target fund"
        )
    
    with col2:
        source_return = st.number_input(
            "Source Fund Expected Annual Return (%)",
            min_value=1.0,
            max_value=15.0,
            value=6.0,
            step=0.1,
            help="Expected return of source fund (typically lower for debt/liquid funds)"
        )
        target_return = st.number_input(
            "Target Fund Expected Annual Return (%)",
            min_value=1.0,
            max_value=30.0,
            value=12.0,
            step=0.1,
            help="Expected return of target fund (typically higher for equity funds)"
        )
        
        # Auto-recommend STP duration
        if st.checkbox("Get Recommended STP Duration"):
            # Simple logic: Higher volatility (equity) = longer duration
            # Gap between target and source returns as proxy for volatility
            return_gap = target_return - source_return
            if return_gap > 10:
                recommended_months = 12
            elif return_gap > 6:
                recommended_months = 9
            else:
                recommended_months = 6
                
            st.write(f"Recommended STP Duration: **{recommended_months} months**")
            st.write("*Based on the return differential between funds*")
    
    if st.button("Calculate STP Strategy", use_container_width=True):
        # Check if transfer amount is valid
        if monthly_transfer * time_period > initial_amount:
            st.error(f"""
            ⚠️ **Invalid STP Parameters**
            Your monthly transfer (₹{monthly_transfer:,.2f}) over {time_period} months (total ₹{monthly_transfer*time_period:,.2f}) 
            exceeds your initial investment (₹{initial_amount:,.2f}).
            Please adjust your parameters.
            """)
            return
            
        results = calculate_stp_returns(
            initial_amount,
            monthly_transfer,
            source_return,
            target_return,
            time_period
        )
        
        # Display key metrics
        st.subheader("📊 STP Strategy Analysis")
        
        col1, col2, col3 = st.columns(3)
        with col1:
            st.metric(
                "Final Portfolio Value",
                f"₹{results['final_value']:,.2f}",
                f"{results['return_percentage']:,.1f}%"
            )
        with col2:
            st.metric(
                "Absolute Return",
                f"₹{results['absolute_return']:,.2f}",
                f"CAGR: {results['cagr']:,.2f}%"
            )
        with col3:
            lumpsum_diff = results['lumpsum_comparison']['difference']
            lumpsum_diff_pct = results['lumpsum_comparison']['difference_percentage']
            
            # Determine if STP outperformed lumpsum
            diff_text = "vs. Lumpsum"
            if lumpsum_diff > 0:
                diff_color = "normal"  # green
            else:
                diff_color = "inverse"  # red
                
            st.metric(
                f"STP {diff_text}",
                f"₹{abs(lumpsum_diff):,.2f}",
                f"{lumpsum_diff_pct:,.2f}%",
                delta_color=diff_color
            )
        
        # Create visualization
        st.subheader("Fund Value Progression")
        
        df = pd.DataFrame({
            'Month': results['months'],
            'Source Fund': results['source_fund'],
            'Target Fund': results['target_fund'],
            'Total Portfolio': results['total_value'],
            'Lumpsum in Target Fund': results['lumpsum_target']
        })
        
        fig = px.line(
            df,
            x='Month',
            y=['Source Fund', 'Target Fund', 'Total Portfolio', 'Lumpsum in Target Fund'],
            title='STP Strategy Performance Over Time',
            labels={'value': 'Amount (₹)', 'variable': 'Fund Type'}
        )
        st.plotly_chart(fig, use_container_width=True)
        
        # Monthly Breakdown
        with st.expander("Monthly Breakdown"):
            monthly_df = pd.DataFrame({
                'Month': results['months'][1:],  # Skip initial state
                'Source Fund (₹)': [v for v in results['source_fund'][1:]],
                'Target Fund (₹)': [v for v in results['target_fund'][1:]],
                'Total Value (₹)': [v for v in results['total_value'][1:]],
                'Lumpsum Alternative (₹)': [v for v in results['lumpsum_target'][1:]]
            })
            
            st.dataframe(monthly_df.style.format({
                'Source Fund (₹)': '₹{:,.2f}',
                'Target Fund (₹)': '₹{:,.2f}',
                'Total Value (₹)': '₹{:,.2f}',
                'Lumpsum Alternative (₹)': '₹{:,.2f}'
            }))
        
        # Analysis of results
        st.subheader("Strategy Analysis")
        
        # STP vs Lumpsum comparison
        stp_vs_lumpsum = "outperformed" if lumpsum_diff > 0 else "underperformed"
        if abs(lumpsum_diff_pct) < 0.5:
            stp_vs_lumpsum = "performed similarly to"
            
        st.info(f"""
        ### 💡 STP vs. Lumpsum Investment
        - Your STP strategy has **{stp_vs_lumpsum}** a direct lumpsum investment by **{abs(lumpsum_diff_pct):.2f}%**
        - Final STP value: ₹{results['final_value']:,.2f}
        - Final Lumpsum value: ₹{results['lumpsum_comparison']['final_value']:,.2f}
        - Difference: ₹{abs(lumpsum_diff):,.2f}
        """)
        
        # Recommendations based on results
        if target_return > source_return + 5:
            if lumpsum_diff < 0 and abs(lumpsum_diff_pct) > 2:
                st.warning("""
                ### 📈 Market Trend Considerations
                In a strongly trending upward market, lumpsum investments in equity funds might outperform STP strategies.
                However, STPs still offer risk management benefits through rupee-cost averaging.
                """)
            elif lumpsum_diff > 0:
                st.success("""
                ### ✅ Effective Risk Management
                Your STP strategy is effectively balancing risk while maintaining good returns.
                This approach helps mitigate the impact of market volatility while staying invested.
                """)
        
        # Fund type recommendations
        st.subheader("Recommended Fund Combinations for STP")
        
        if source_return <= 7.0 and target_return >= 10.0:
            st.write("""
            ### Ideal Fund Combinations for Your Parameters
            
            #### Source Funds (Lower Risk)
            - **Liquid Funds**: Ultra-short duration with high liquidity, typically 5-6% returns
            - **Money Market Funds**: Short-term debt instruments, typically 5.5-7% returns
            - **Short Duration Debt Funds**: Slightly higher yielding, typically 6-8% returns
            
            #### Target Funds (Higher Growth)
            - **Equity Funds**: Higher potential returns with increased volatility
            - **Balanced Advantage Funds**: Dynamic allocation between equity and debt
            - **Aggressive Hybrid Funds**: Predominantly equity with some debt allocation
            """)
        elif source_return <= 7.0 and target_return < 10.0:
            st.write("""
            ### Ideal Fund Combinations for Your Parameters
            
            #### Source Funds (Lower Risk)
            - **Liquid Funds**: Ultra-short duration with high liquidity, typically 5-6% returns
            - **Money Market Funds**: Short-term debt instruments, typically 5.5-7% returns
            
            #### Target Funds (Moderate Growth)
            - **Corporate Bond Funds**: Higher quality corporate bonds with moderate returns
            - **Banking & PSU Funds**: Focus on debt securities of banks and PSUs
            - **Conservative Hybrid Funds**: Predominantly debt with some equity exposure
            """)
        else:
            st.write("""
            ### Customized Fund Combinations
            Your selected return parameters are somewhat unconventional. Consider reviewing typical returns:
            
            - **Liquid/Debt Funds**: Typically 5-8% annual returns
            - **Hybrid Funds**: Typically 8-11% expected returns
            - **Equity Funds**: Typically 10-14% expected long-term returns
            """)
        
        # Tax implications
        with st.expander("Tax Implications of STP"):
            st.write("""
            ### Tax Considerations for STP in India
            
            #### Source Fund Redemption (Each Transfer)
            - **Debt Funds (including Liquid Funds)**:
              - Short-term Capital Gains (STCG): Held < 3 years, taxed at income tax slab rate
              - Long-term Capital Gains (LTCG): Held ≥ 3 years, taxed at 20% with indexation
            
            #### Target Fund Growth
            - **Equity Funds**:
              - STCG: Held < 1 year, taxed at 15%
              - LTCG: Held ≥ 1 year, taxed at 10% without indexation (exemption up to ₹1 lakh per financial year)
            - **Debt Funds**:
              - Same as source fund redemption
              
            #### Tax-Efficient Alternatives
            - Consider **Systematic Investment Plan (SIP)** in target fund directly if primary goal is rupee-cost averaging
            - Consider **Balanced Advantage Funds** or **Dynamic Asset Allocation Funds** that handle asset allocation shifts internally (more tax-efficient)
            """)
        
        # Common STP FAQs
        with st.expander("Frequently Asked Questions"):
            st.write("""
            ### STP FAQs
            
            **Q: Who should use STP?**  
            A: Investors with lumpsum amounts looking to gradually enter equity markets, reduce timing risk, or systematically change asset allocation.
            
            **Q: What's the ideal STP duration?**  
            A: Typically 3-12 months depending on market conditions and amount. Larger amounts and higher market volatility favor longer durations.
            
            **Q: Can I customize transfer frequency?**  
            A: Yes, most AMCs offer weekly, fortnightly, and monthly STP options.
            
            **Q: Is there a minimum amount requirement?**  
            A: Typically ₹1,000 per transfer with a minimum of 6 installments for most AMCs.
            
            **Q: How does STP differ from SIP?**  
            A: SIP involves regular investments from your bank account, while STP transfers from one fund to another within the same fund house.
            """)
        
        # Disclaimer
        st.warning("""
        **Disclaimer:** 
        1. Calculations are based on constant returns for illustrative purposes
        2. Actual returns will vary based on market conditions
        3. This calculator does not account for exit loads or taxes which may apply to STP transactions
        4. Consult a financial advisor before implementing an STP strategy
        """)

def show_salary_calculator():
    """Show the salary calculator interface with Indian tax calculations"""
    st.header("Salary Calculator 💼")
    st.write("""
    Calculate your take-home salary after taxes and deductions based on Indian tax rules.
    This calculator compares both the old and new tax regimes to help you determine which is more beneficial for you.
    """)
    
    with st.expander("ℹ️ About Indian Tax Regimes", expanded=False):
        st.markdown("""
        #### Old Tax Regime
        - Allows for various deductions and exemptions (Section 80C, HRA, etc.)
        - Higher tax rates compared to the new regime
        - Tax Slabs: 
          * No tax up to ₹2.5 lakh
          * 5% for ₹2.5 lakh to ₹5 lakh
          * 20% for ₹5 lakh to ₹10 lakh
          * 30% for income above ₹10 lakh
        
        #### New Tax Regime (Simplified)
        - Fewer deductions and exemptions allowed
        - Lower tax rates but fewer deductions
        - Tax Slabs:
          * No tax up to ₹3 lakh
          * 5% for ₹3 lakh to ₹6 lakh
          * 10% for ₹6 lakh to ₹9 lakh
          * 15% for ₹9 lakh to ₹12 lakh
          * 20% for ₹12 lakh to ₹15 lakh
          * 30% for income above ₹15 lakh
        
        Both regimes have a 4% health and education cess applied on the calculated tax amount.
        """)
    
    st.subheader("Income Details")
    
    col1, col2 = st.columns(2)
    with col1:
        basic_salary = st.number_input(
            "Basic Salary (Annual) ₹",
            min_value=0,
            value=600000,
            step=10000,
            help="Annual basic salary before any allowances or deductions"
        )
        
        hra = st.number_input(
            "House Rent Allowance (Annual) ₹",
            min_value=0,
            value=int(basic_salary * 0.4),  # Typical HRA is 40% of basic
            step=1000,
            help="Annual House Rent Allowance provided by employer"
        )
        
        allowances = st.number_input(
            "Other Allowances (Annual) ₹",
            min_value=0,
            value=int(basic_salary * 0.2),  # Estimated other allowances
            step=5000,
            help="Special allowance, transport allowance, etc."
        )
    
    with col2:
        bonus = st.number_input(
            "Annual Bonus/Performance Pay ₹",
            min_value=0,
            value=int(basic_salary * 0.1),  # Estimated bonus
            step=10000,
            help="Annual bonus, variable pay, or performance incentives"
        )
        
        pf_contribution = st.number_input(
            "Employee PF Contribution (Annual) ₹",
            min_value=0,
            value=int(min(basic_salary * 0.12, 21600*12)),  # 12% of basic but capped
            step=1000,
            help="Employee contribution to Provident Fund (typically 12% of basic)"
        )
        
        professional_tax = st.number_input(
            "Professional Tax (Annual) ₹",
            min_value=0,
            max_value=5000,
            value=2400,  # Standard in many states
            step=100,
            help="Professional tax deducted as per state regulations"
        )
    
    st.subheader("Tax Saving Investments & Exemptions")
    
    col1, col2 = st.columns(2)
    with col1:
        investments = st.number_input(
            "Tax Saving Investments (80C) ₹",
            min_value=0,
            max_value=150000,
            value=min(int(basic_salary * 0.15), 150000),  # Estimated 80C investments
            step=1000,
            help="Investments eligible for Section 80C deduction (max ₹1.5 lakh)"
        )
        
        rent_paid = st.number_input(
            "Annual Rent Paid ₹",
            min_value=0,
            value=int(basic_salary * 0.3),  # Estimated rent
            step=1000,
            help="Annual rent paid for HRA exemption calculation"
        )
    
    with col2:
        metro_city = st.checkbox(
            "Living in a Metro City",
            value=True,
            help="Select if you live in a metro city (Mumbai, Delhi, Chennai, Kolkata)"
        )
        
        is_self_employed = st.checkbox(
            "Self-Employed",
            value=False,
            help="Select if you're self-employed (affects standard deduction)"
        )
    
    if st.button("Calculate Salary Breakdown", use_container_width=True):
        results = calculate_salary_details(
            basic_salary=basic_salary,
            hra=hra,
            allowances=allowances,
            bonus=bonus,
            investments=investments,
            rent_paid=rent_paid,
            metro_city=metro_city,
            pf_contribution=pf_contribution,
            professional_tax=professional_tax,
            is_self_employed=is_self_employed
        )
        
        # Display key metrics
        st.subheader("📊 Salary Breakdown")
        
        # Highlight the optimal tax regime
        if results['optimal_regime'] == "Old Regime":
            old_regime_color = "success"
            new_regime_color = "default"
            st.success(f"✅ **Optimal Tax Regime: Old Regime** (Saving ₹{results['tax_savings']:,.2f})")
        else:
            old_regime_color = "default"
            new_regime_color = "success"
            st.success(f"✅ **Optimal Tax Regime: New Regime** (Saving ₹{results['tax_savings']:,.2f})")
        
        # Summary metrics
        col1, col2, col3 = st.columns(3)
        with col1:
            st.metric(
                "Gross Monthly Salary",
                f"₹{results['gross_monthly']:,.2f}"
            )
        with col2:
            st.metric(
                "Monthly Take-Home",
                f"₹{results['monthly_take_home']:,.2f}"
            )
        with col3:
            st.metric(
                "Monthly Tax",
                f"₹{results['monthly_tax']:,.2f}"
            )
        
        # Detailed breakdown
        st.write("### 🧾 Annual Salary Breakdown")
        
        tab1, tab2, tab3 = st.tabs(["Summary", "Tax Comparison", "Detailed Breakdown"])
        
        with tab1:
            col1, col2 = st.columns(2)
            
            with col1:
                st.write("#### Income Components")
                income_df = pd.DataFrame({
                    'Component': ['Basic Salary', 'HRA', 'Other Allowances', 'Bonus/Incentives', 'Gross Annual'],
                    'Amount (₹)': [
                        basic_salary,
                        hra,
                        allowances,
                        bonus,
                        results['gross_annual']
                    ]
                })
                
                st.dataframe(income_df.style.format({'Amount (₹)': '₹{:,.2f}'}), use_container_width=True)
            
            with col2:
                st.write("#### Deductions & Exemptions")
                deductions_df = pd.DataFrame({
                    'Component': ['Standard Deduction', '80C Investments', 'HRA Exemption', 'PF Contribution', 'Professional Tax', 'Total Deductions'],
                    'Amount (₹)': [
                        50000 if not is_self_employed else 0,
                        results['tax_saving_investments'],
                        results['hra_exemption'],
                        pf_contribution,
                        professional_tax,
                        results['total_deductions'] + results['hra_exemption']
                    ]
                })
                
                st.dataframe(deductions_df.style.format({'Amount (₹)': '₹{:,.2f}'}), use_container_width=True)
        
        with tab2:
            # Create a comparison dataframe
            comparison_df = pd.DataFrame({
                'Parameter': ['Taxable Income', 'Tax Payable', 'Effective Tax Rate', 'Monthly Take-Home', 'Annual Take-Home'],
                'Old Regime': [
                    f"₹{results['taxable_income']:,.2f}" if results['optimal_regime'] == "Old Regime" else f"₹{results['gross_annual'] - 50000 - professional_tax:,.2f}",
                    f"₹{results['old_regime_tax']:,.2f}",
                    f"{(results['old_regime_tax']/results['gross_annual'])*100:.2f}%",
                    f"₹{(results['gross_monthly'] - (results['old_regime_tax']/12) - (professional_tax/12) - (pf_contribution/12)):,.2f}",
                    f"₹{(results['gross_annual'] - results['old_regime_tax'] - professional_tax - pf_contribution):,.2f}"
                ],
                'New Regime': [
                    f"₹{results['gross_annual'] - professional_tax:,.2f}" if results['optimal_regime'] == "New Regime" else f"₹{results['taxable_income'] + results['tax_saving_investments']:,.2f}",
                    f"₹{results['new_regime_tax']:,.2f}",
                    f"{(results['new_regime_tax']/results['gross_annual'])*100:.2f}%",
                    f"₹{(results['gross_monthly'] - (results['new_regime_tax']/12) - (professional_tax/12) - (pf_contribution/12)):,.2f}",
                    f"₹{(results['gross_annual'] - results['new_regime_tax'] - professional_tax - pf_contribution):,.2f}"
                ]
            })
            
            # Color-code the optimal regime
            def highlight_optimal(s):
                styles = [''] * len(s)
                if results['optimal_regime'] == "Old Regime":
                    styles[1] = 'background-color: rgba(0, 200, 0, 0.2)'
                else:
                    styles[2] = 'background-color: rgba(0, 200, 0, 0.2)'
                return styles
            
            st.dataframe(comparison_df.style.apply(highlight_optimal, axis=1), use_container_width=True)
            
            # Visualization
            st.write("#### Tax Comparison Chart")
            
            # Prepare data for chart
            tax_data = pd.DataFrame({
                'Regime': ['Old Regime', 'New Regime'],
                'Tax Amount': [results['old_regime_tax'], results['new_regime_tax']]
            })
            
            fig = px.bar(
                tax_data,
                x='Regime',
                y='Tax Amount',
                color='Regime',
                color_discrete_map={
                    'Old Regime': 'rgba(0, 104, 201, 0.8)' if results['optimal_regime'] != "Old Regime" else 'rgba(0, 200, 0, 0.8)',
                    'New Regime': 'rgba(255, 102, 0, 0.8)' if results['optimal_regime'] != "New Regime" else 'rgba(0, 200, 0, 0.8)'
                },
                text_auto=True,
                title="Tax Comparison Between Regimes"
            )
            
            fig.update_traces(texttemplate='₹%{y:,.2f}', textposition='outside')
            fig.update_layout(
                yaxis_title="Annual Tax Amount (₹)",
                xaxis_title="",
                showlegend=False
            )
            
            st.plotly_chart(fig, use_container_width=True)
            
            # Show tax savings
            st.info(f"""
            #### 💰 Potential Tax Savings
            By choosing the **{results['optimal_regime']}**, you can save **₹{results['tax_savings']:,.2f}** annually.
            This amounts to **₹{results['tax_savings']/12:,.2f}** monthly in additional take-home pay.
            """)
        
        with tab3:
            st.write("#### Take-Home Pay Analysis")
            take_home_df = pd.DataFrame({
                'Component': ['Gross Annual Salary', 'Gross Monthly Salary', 'Income Tax Payable (Annual)', 'PF Contribution (Annual)', 'Professional Tax (Annual)', 'Take-Home Pay (Annual)', 'Take-Home Pay (Monthly)'],
                'Amount (₹)': [
                    results['gross_annual'],
                    results['gross_monthly'],
                    results['tax_payable'],
                    pf_contribution,
                    professional_tax,
                    results['annual_take_home'],
                    results['monthly_take_home']
                ]
            })
            
            st.dataframe(take_home_df.style.format({'Amount (₹)': '₹{:,.2f}'}), use_container_width=True)
            
            st.write("#### Distribution of Gross Salary")
            # Prepare data for pie chart
            distribution_data = {
                'Category': ['Take-Home Pay', 'Income Tax', 'PF Contribution', 'Professional Tax'],
                'Amount': [
                    results['annual_take_home'],
                    results['tax_payable'],
                    pf_contribution,
                    professional_tax
                ]
            }
            distribution_df = pd.DataFrame(distribution_data)
            
            fig = px.pie(
                distribution_df,
                values='Amount',
                names='Category',
                title="Annual Salary Distribution",
                hole=0.4,
                color_discrete_sequence=px.colors.qualitative.Pastel
            )
            
            fig.update_traces(
                textinfo='percent+label',
                pull=[0.1 if x == 'Take-Home Pay' else 0 for x in distribution_df['Category']]
            )
            
            st.plotly_chart(fig, use_container_width=True)
        
        # Key insights
        st.subheader("💡 Key Insights")
        
        # Tax efficiency
        effective_tax_rate = results['effective_tax_rate']
        if effective_tax_rate < 5:
            tax_efficiency = "Excellent"
            tax_message = "You're in a low tax bracket with minimal tax impact."
        elif effective_tax_rate < 10:
            tax_efficiency = "Good"
            tax_message = "Your tax burden is moderate."
        elif effective_tax_rate < 20:
            tax_efficiency = "Moderate"
            tax_message = "Consider optimizing tax-saving investments."
        else:
            tax_efficiency = "High"
            tax_message = "Your tax burden is significant. Consider tax planning strategies."
        
        col1, col2 = st.columns(2)
        with col1:
            st.info(f"""
            #### Tax Efficiency: {tax_efficiency}
            - Effective Tax Rate: {effective_tax_rate:.2f}%
            - {tax_message}
            """)
            
            # Deduction utilization
            if results['tax_saving_investments'] < 150000 and results['optimal_regime'] == "Old Regime":
                st.warning(f"""
                #### 80C Deduction Opportunity
                You're currently using ₹{results['tax_saving_investments']:,.2f} of the ₹1,50,000 available under Section 80C.
                Consider maximizing this deduction to save up to ₹{(150000 - results['tax_saving_investments']) * 0.3:,.2f} more in taxes.
                """)
            else:
                st.success(f"""
                #### Good Deduction Utilization
                You're efficiently utilizing tax deductions based on your chosen regime.
                """)
        
        with col2:
            # HRA optimization
            if results['hra_exemption'] < hra and rent_paid > 0:
                st.warning(f"""
                #### HRA Optimization Opportunity
                Your HRA exemption (₹{results['hra_exemption']:,.2f}) is less than your HRA (₹{hra:,.2f}).
                - To maximize exemption, consider a rent of at least ₹{0.1 * basic_salary + (0.5 * basic_salary if metro_city else 0.4 * basic_salary):,.2f} annually.
                """)
            elif rent_paid == 0 and hra > 0:
                st.warning(f"""
                #### Missing HRA Benefit
                You're receiving HRA of ₹{hra:,.2f} but haven't entered any rent paid.
                If you're paying rent, enter the amount to potentially reduce your taxable income.
                """)
            else:
                st.success(f"""
                #### Good HRA Utilization
                You're effectively utilizing your HRA exemption based on your rent payment.
                """)
        
        # Recommendations
        st.subheader("🔍 Recommendations")
        
        recommendations = []
        
        # Tax regime recommendation
        if results['optimal_regime'] == "Old Regime":
            recommendations.append("Continue with the Old Tax Regime as it's more beneficial for you.")
            
            # 80C recommendations
            if results['tax_saving_investments'] < 150000:
                recommendations.append(f"Increase your 80C investments by ₹{150000 - results['tax_saving_investments']:,.2f} to maximize tax benefits.")
        else:
            recommendations.append("The New Tax Regime is more beneficial for you with its simplified structure and lower rates.")
        
        # PF recommendations
        if pf_contribution < 0.12 * basic_salary and not is_self_employed:
            recommendations.append("Consider increasing your PF contribution for long-term wealth building and tax benefits.")
        
        # General recommendations
        recommendations.append("Consider other tax-saving options like health insurance premium (Section 80D) or NPS contribution (Section 80CCD).")
        
        for i, rec in enumerate(recommendations):
            st.write(f"{i+1}. {rec}")
        
        # Disclaimer
        st.warning("""
        **Disclaimer:** This calculator provides estimates based on current tax rates and rules. 
        Tax laws are subject to change. Consult a tax professional for personalized advice.
        """)

def show_regular_vs_direct_calculator():
    """Show the interface for comparing regular and direct mutual fund plans"""
    st.header("Regular vs Direct Mutual Fund Calculator")
    st.write("""
    Compare the long-term impact of expense ratios between regular and direct mutual fund plans.
    Direct plans typically have lower expense ratios as they don't include distributor commissions.
    """)
    
    st.info("""
    ### 💡 Regular vs Direct Plans
    - **Regular Plans**: Include distributor/broker commission in expense ratio
    - **Direct Plans**: No distributor commission, resulting in lower expense ratio
    - Direct plans of the same mutual fund typically outperform regular plans over time due to lower expenses
    """)
    
    col1, col2 = st.columns(2)
    with col1:
        investment_amount = st.number_input(
            "Initial Investment Amount (₹)",
            min_value=1000,
            value=100000,
            step=10000
        )
        time_period = st.number_input(
            "Investment Time Period (Years)",
            min_value=1,
            max_value=40,
            value=10
        )
        expected_return = st.number_input(
            "Expected Annual Return (%)",
            min_value=1.0,
            max_value=30.0,
            value=12.0,
            step=0.1,
            help="Expected return before expenses are deducted"
        )
    
    with col2:
        regular_expense_ratio = st.number_input(
            "Regular Plan Expense Ratio (%)",
            min_value=0.1,
            max_value=3.0,
            value=2.0,
            step=0.1,
            help="Typical range for equity funds: 1.5%-2.25%"
        )
        direct_expense_ratio = st.number_input(
            "Direct Plan Expense Ratio (%)",
            min_value=0.1,
            max_value=2.0,
            value=1.0,
            step=0.1,
            help="Typical range for equity funds: 0.5%-1.5%"
        )
        
        # Auto-calculate direct expense ratio option
        if st.checkbox("Auto-calculate Direct Plan Expense Ratio", value=False):
            direct_expense_ratio = max(0.5, regular_expense_ratio - 0.8)
            st.write(f"Auto-calculated Direct Plan Expense Ratio: **{direct_expense_ratio:.2f}%**")
    
    if st.button("Calculate Comparison", use_container_width=True):
        results = calculate_mutual_fund_comparison(
            investment_amount,
            regular_expense_ratio,
            direct_expense_ratio,
            expected_return,
            time_period
        )
        
        # Display key metrics
        st.subheader("📊 Impact of Expense Ratio Analysis")
        
        col1, col2, col3 = st.columns(3)
        with col1:
            st.metric(
                "Regular Plan Final Value",
                f"₹{results['regular_future_value']:,.2f}",
                f"{((results['regular_future_value']/investment_amount - 1) * 100):,.1f}%"
            )
        with col2:
            st.metric(
                "Direct Plan Final Value",
                f"₹{results['direct_future_value']:,.2f}",
                f"{((results['direct_future_value']/investment_amount - 1) * 100):,.1f}%"
            )
        with col3:
            st.metric(
                "Extra Returns with Direct Plan",
                f"₹{results['expense_impact']:,.2f}",
                f"{results['expense_impact_percentage']:,.1f}%"
            )
        
        # Create visualization
        df = pd.DataFrame({
            'Year': results['years'],
            'Regular Plan': results['regular_values'],
            'Direct Plan': results['direct_values']
        })
        
        fig = px.line(
            df,
            x='Year',
            y=['Regular Plan', 'Direct Plan'],
            title='Regular vs Direct Plan Growth Over Time',
            labels={'value': 'Value (₹)', 'variable': 'Plan Type'}
        )
        st.plotly_chart(fig, use_container_width=True)
        
        # Calculate annual differential
        annual_difference = (results['direct_future_value'] / results['regular_future_value']) ** (1/time_period) - 1
        annual_difference_percentage = annual_difference * 100
        
        st.info(f"""
        ### 💡 Key Findings
        1. **Expense Ratio Differential**: {regular_expense_ratio - direct_expense_ratio:.2f}%
        2. **Annual Performance Difference**: {annual_difference_percentage:.2f}% (compounded)
        3. **Total Additional Return**: ₹{results['expense_impact']:,.2f} ({results['expense_impact_percentage']:.1f}% of initial investment)
        4. **Amplification Over Time**: The expense difference compounds over time, becoming more significant with longer investment periods
        """)
        
        # Common fund types and expense ratios in India
        with st.expander("Common Mutual Fund Types and Expense Ratios in India"):
            st.write("""
            ### Equity Funds
            - **Large Cap**: Regular (1.5-2.0%), Direct (0.6-1.2%)
            - **Mid Cap**: Regular (1.8-2.25%), Direct (0.8-1.5%)
            - **Small Cap**: Regular (1.8-2.25%), Direct (0.8-1.5%)
            - **ELSS (Tax Saving)**: Regular (1.7-2.1%), Direct (0.7-1.3%)
            
            ### Hybrid Funds
            - **Balanced**: Regular (1.5-2.0%), Direct (0.7-1.2%)
            - **Conservative Hybrid**: Regular (1.4-1.9%), Direct (0.6-1.0%)
            
            ### Debt Funds
            - **Liquid Funds**: Regular (0.3-0.8%), Direct (0.1-0.25%)
            - **Short Duration**: Regular (0.8-1.5%), Direct (0.3-0.7%)
            - **Corporate Bond**: Regular (0.8-1.5%), Direct (0.3-0.7%)
            - **Government Securities**: Regular (0.8-1.5%), Direct (0.3-0.7%)
            """)
        
        # Investment recommendations
        st.subheader("Recommendations")
        
        if results['expense_impact_percentage'] > 20:
            st.success("""
            ✅ **Significant Expense Impact Detected**
            - Direct plans show substantial advantage over regular plans in your scenario
            - Consider switching existing investments to direct plans
            - For new investments, opt for direct plans to maximize returns
            """)
        elif results['expense_impact_percentage'] > 10:
            st.warning("""
            ⚠️ **Moderate Expense Impact**
            - Direct plans offer meaningful advantage over time
            - Consider the value you get from your advisor/broker against this cost
            - For DIY investors, direct plans are recommended
            """)
        else:
            st.info("""
            ℹ️ **Limited Expense Impact**
            - The expense differential has relatively small impact in this scenario
            - If you value advice from distributor/broker, regular plans may be justified
            - For longer time horizons, impact will grow more significant
            """)
        
        # Educational content
        st.markdown("### How to Switch from Regular to Direct Plans")
        
        switching_options = st.selectbox(
            "Choose Switching Method",
            ["Select an option", "Same AMC (Tax-efficient)", "Different AMC (Potential exit load)"]
        )
        
        if switching_options == "Same AMC (Tax-efficient)":
            st.write("""
            1. **Login to AMC Website/App**: Access your mutual fund AMC's official portal
            2. **Find Switch Option**: Look for 'Switch' or 'Convert to Direct' option
            3. **Select Funds**: Choose which regular plans to convert to direct
            4. **Verify Details**: Confirm the switch details
            5. **Submit Request**: Complete the transaction
            
            **Tax Implications**: No tax impact as this is considered an internal switch
            """)
        elif switching_options == "Different AMC (Potential exit load)":
            st.write("""
            1. **Redeem Current Holding**: Sell your regular plan units
            2. **Check Exit Load**: Verify if exit load is applicable
            3. **Tax Consideration**: Redemption may trigger capital gains tax
            4. **Reinvest in Direct Plan**: Invest the proceeds in direct plan of same/different fund
            
            **Caution**: This approach may have tax implications and potential exit load costs
            """)
            
        # Disclaimer
        st.warning("""
        **Disclaimer:** 
        1. Calculations are based on constant returns and expense ratios for illustrative purposes
        2. Actual returns will vary based on market conditions
        3. Expense ratios may change over time based on SEBI regulations
        4. This calculator does not account for entry/exit loads or taxes
        5. Consult a financial advisor before making investment decisions
        """)
        
        # Goal integration section
        with st.expander("Create Investment Plan Goal"):
            st.markdown("""
            Want to track this investment as a financial goal? Create a goal to monitor your progress!
            """)
            
            goal_name = st.text_input(
                "Goal Name", 
                value=f"Mutual Fund Investment (₹{investment_amount:,.0f})",
                key="mf_goal_name"
            )
            
            # Determine goal type based on investment period
            goal_type = "Short-Term" if time_period <= 3 else "Mid-Term" if time_period <= 7 else "Long-Term"
            st.write(f"Goal Type: **{goal_type}**")
            
            # Auto-fill values from calculator
            col1, col2 = st.columns(2)
            with col1:
                st.write(f"Target Amount: **₹{results['direct_future_value']:,.2f}**")
            with col2:
                st.write(f"Investment Amount: **₹{investment_amount:,.2f}**")
            
            add_sip = st.checkbox("Add Monthly SIP")
            
            if add_sip:
                monthly_sip = st.number_input(
                    "Monthly SIP Amount (₹)",
                    min_value=500,
                    max_value=1000000,
                    value=5000,
                    step=500
                )
            
            if st.button("Create Investment Goal", key="mf_create_goal"):
                # Process goal creation logic here
                st.success("Goal information prepared! You can visit the Goal Settings page to track your progress.")

@st.cache_data
def calculate_brokerage(transaction_type, exchange, delivery, quantity, price, turnover=None):
    """Calculate brokerage charges for stock transactions"""
    if not turnover:
        turnover = quantity * price
    
    # Default charges (illustrative)
    brokerage = 0  # Many discount brokers offer zero brokerage
    
    # Exchange Transaction Charges
    if exchange == "NSE":
        transaction_charges = turnover * 0.00325 / 100
    elif exchange == "BSE":
        transaction_charges = turnover * 0.00375 / 100
    else:  # For others like MCX, etc.
        transaction_charges = turnover * 0.005 / 100
    
    # SEBI Charges
    sebi_charges = turnover * 0.0001 / 100
    
    # Securities Transaction Tax (STT)
    if delivery:
        if transaction_type == "Buy":
            stt = turnover * 0.1 / 100
        else:  # Sell
            stt = turnover * 0.1 / 100
    else:  # Intraday
        if transaction_type == "Buy":
            stt = 0
        else:  # Sell
            stt = turnover * 0.025 / 100
    
    # GST (18% on brokerage and transaction charges)
    gst = (brokerage + transaction_charges) * 18 / 100
    
    # Stamp Duty (on buy side only)
    if transaction_type == "Buy":
        if delivery:
            stamp_duty = turnover * 0.015 / 100
        else:  # Intraday
            stamp_duty = turnover * 0.003 / 100
    else:  # Sell
        stamp_duty = 0
    
    # Total charges
    total_charges = brokerage + transaction_charges + sebi_charges + stt + gst + stamp_duty
    
    # Net amount
    if transaction_type == "Buy":
        net_amount = turnover + total_charges
    else:  # Sell
        net_amount = turnover - total_charges
        
    # Return a dictionary with all the details
    return {
        'turnover': turnover,
        'brokerage': brokerage,
        'transaction_charges': transaction_charges,
        'sebi_charges': sebi_charges,
        'stt': stt,
        'gst': gst,
        'stamp_duty': stamp_duty,
        'total_charges': total_charges,
        'net_amount': net_amount,
        'percentage_impact': (total_charges / turnover) * 100
    }

def show_apy_calculator():
    """Show the Atal Pension Yojana (APY) calculator interface"""
    st.header("Atal Pension Yojana (APY) Calculator 👴")
    st.write("""
    Plan your retirement with Atal Pension Yojana (APY). This calculator helps you estimate your 
    contributions and pension benefits under the government's APY scheme.
    """)
    
    with st.expander("ℹ️ About Atal Pension Yojana (APY)", expanded=False):
        st.markdown("""
        #### What is APY?
        
        The Atal Pension Yojana (APY) is a government-backed pension scheme primarily focused on workers 
        in the unorganized sector. It guarantees a fixed minimum pension ranging from ₹1,000 to ₹5,000 
        per month, depending on the contribution amount.
        
        #### Key Features:
        
        1. **Eligibility**: 
           - Indian citizens between 18-40 years of age
           - Must have a savings bank account/post office account
        
        2. **Contribution Period**:
           - Contributions continue until the age of 60 years
           - Contribution amount depends on age at entry and chosen pension amount
        
        3. **Pension Benefits**:
           - Fixed monthly pension of ₹1,000 to ₹5,000 after age 60
           - Pension amount is guaranteed by the Government of India
           - After subscriber's death, the pension is paid to the spouse
           - The corpus is returned to nominees after both subscriber and spouse's death
        
        4. **Tax Benefits**:
           - Contributions eligible for tax deduction under Section 80CCD(1) within the overall limit of Section 80C (₹1.5 lakh)
        
        5. **Government Co-contribution**:
           - For certain eligible subscribers, the government contributes 50% of the total contribution or ₹1,000 per annum, whichever is lower (for accounts opened before March 31, 2016)
        
        #### APY vs Other Retirement Schemes:
        
        | Feature | APY | NPS | PPF |
        |---------|-----|-----|-----|
        | Minimum Investment | ₹42-₹1,454/month (age-based) | ₹500/month | ₹500/year |
        | Returns | Fixed pension guaranteed | Market-linked, variable | Fixed interest rate (7.1% currently) |
        | Flexibility | Low (fixed pension tiers) | High (customizable investment) | Medium |
        | Withdrawal | Only at 60 years | Partial withdrawal allowed | Partial withdrawal after 5 years |
        | Risk | No market risk | Market risk present | No risk (govt. backed) |
        | Tax Benefits | Sec 80CCD | Sec 80C + 80CCD(1B) | Sec 80C |
        """)
    
    # User Inputs
    st.subheader("📝 Your Details")
    
    col1, col2 = st.columns(2)
    with col1:
        current_age = st.number_input(
            "Current Age (years)",
            min_value=18,
            max_value=40,
            value=30,
            step=1,
            help="APY is available for citizens between 18-40 years"
        )
    
    with col2:
        target_pension = st.select_slider(
            "Select Monthly Pension Target (₹)",
            options=[1000, 2000, 3000, 4000, 5000],
            value=3000,
            help="Fixed pension amount you will receive after age 60"
        )
    
    # Additional info about APY contribution
    st.info("""
    #### How APY Works
    
    Your contribution amount in APY is determined by:
    1. Your current age at enrollment
    2. Your chosen monthly pension amount
    
    The younger you join, the lower your monthly contribution will be for the same pension amount.
    """)
    
    if st.button("Calculate APY Benefits", use_container_width=True):
        # Calculate APY details
        pension, yearly_contribution, total_contribution, years_of_contribution, corpus, return_on_investment, roi_percentage, monthly_contribution = calculate_apy(
            0, current_age, target_pension
        )
        
        # Display key results
        st.subheader("📊 APY Benefits Analysis")
        
        col1, col2, col3 = st.columns(3)
        with col1:
            st.metric(
                "Monthly Pension After 60",
                f"₹{pension:,.2f}",
                help="Guaranteed monthly pension you will receive after age 60"
            )
        with col2:
            st.metric(
                "Monthly Contribution",
                f"₹{monthly_contribution:.2f}",
                help="Amount you need to contribute monthly"
            )
        with col3:
            st.metric(
                "Total Years of Contribution",
                f"{years_of_contribution} years",
                help="Number of years you will contribute until age 60"
            )
        
        # Contribution details
        st.subheader("💰 Contribution & Returns")
        
        col1, col2, col3 = st.columns(3)
        with col1:
            st.metric(
                "Total Contribution",
                f"₹{total_contribution:,.2f}",
                help="Total amount you will contribute until age 60"
            )
        with col2:
            st.metric(
                "Estimated Corpus at 60",
                f"₹{corpus:,.2f}",
                help="Estimated corpus managed by the APY scheme at age 60"
            )
        with col3:
            st.metric(
                "Effective ROI",
                f"{roi_percentage:.2f}%",
                help="Effective annualized return on your investment"
            )
        
        # Visualization of contribution vs pension received
        st.subheader("📈 APY Contribution vs Pension")
        
        # Create visualization data
        # Calculate total pension received assuming life expectancy of 80 years
        pension_years = 80 - 60  # From retirement age (60) to assumed life expectancy (80)
        total_pension = pension * 12 * pension_years
        
        # Create data for chart
        chart_data = pd.DataFrame({
            'Category': ['Total Contribution', 'Total Expected Pension'],
            'Amount': [total_contribution, total_pension]
        })
        
        # Create bar chart
        fig = px.bar(
            chart_data,
            x='Category',
            y='Amount',
            color='Category',
            title='Contribution vs Expected Pension (assuming 80 years lifespan)',
            labels={'Amount': 'Amount (₹)'},
            color_discrete_sequence=['#3366CC', '#FF9900']
        )
        
        # Format y-axis to show values in thousands/lakhs
        fig.update_layout(
            yaxis=dict(
                title='Amount (₹)',
            )
        )
        
        # Add value labels on top of bars
        fig.update_traces(
            texttemplate='₹%{y:,.0f}',
            textposition='outside'
        )
        
        st.plotly_chart(fig, use_container_width=True)
        
        # Monthly contribution over the years
        st.subheader("📊 Monthly Contribution Projection")
        
        # Create yearly contribution data
        years_list = list(range(current_age, 61))
        contribution_values = [monthly_contribution] * len(years_list)
        
        # Create DataFrame for plotting
        df = pd.DataFrame({
            'Age': years_list,
            'Monthly Contribution': contribution_values
        })
        
        # Create line chart
        fig = px.line(
            df,
            x='Age',
            y='Monthly Contribution',
            title=f'APY Monthly Contribution from Age {current_age} to 60',
            labels={'Monthly Contribution': 'Amount (₹)'},
            markers=True
        )
        
        st.plotly_chart(fig, use_container_width=True)
        
        # Tax benefits
        st.subheader("🧾 Tax Benefits")
        
        # Calculate tax benefits based on current tax slabs
        tax_rates = {
            "10%": 0.10,
            "20%": 0.20,
            "30%": 0.30
        }
        
        # Let user select their tax slab
        tax_slab = st.selectbox(
            "Select Your Income Tax Slab",
            options=list(tax_rates.keys()),
            index=2,
            help="Your highest applicable income tax rate"
        )
        
        tax_rate = tax_rates[tax_slab]
        annual_tax_saving = min(yearly_contribution, 150000) * tax_rate
        lifetime_tax_saving = annual_tax_saving * years_of_contribution
        
        col1, col2 = st.columns(2)
        with col1:
            st.metric(
                "Annual Tax Saving",
                f"₹{annual_tax_saving:,.2f}",
                help="Tax saved annually by contributing to APY"
            )
        with col2:
            st.metric(
                "Lifetime Tax Saving",
                f"₹{lifetime_tax_saving:,.2f}",
                help="Total tax saved over your contribution period"
            )
        
        # Benefits analysis
        st.subheader("⚖️ APY Benefits Analysis")
        
        # Calculate years required to recover investment
        years_to_recover = total_contribution / (pension * 12)
        
        recovery_age = 60 + years_to_recover
        
        # Calculate various metrics for analysis
        monthly_from_corpus = corpus * 0.05 / 12  # Assuming 5% sustainable withdrawal rate
        
        st.write("#### Key Metrics")
        col1, col2 = st.columns(2)
        with col1:
            st.metric(
                "Contribution Recovery Period",
                f"{years_to_recover:.1f} years",
                help="Number of years to recover your total contribution through pension"
            )
            st.write(f"You will recover your investment by age **{recovery_age:.1f}**")
        
        with col2:
            st.metric(
                "Equivalent Self-Managed Pension",
                f"₹{monthly_from_corpus:,.2f}/month",
                f"{monthly_from_corpus - pension:,.2f} vs APY",
                help="What your corpus could generate monthly at 5% annual withdrawal rate"
            )
        
        # Recommendations based on age
        st.subheader("💡 Personalized Recommendations")
        
        if current_age <= 25:
            st.success("""
            ### Excellent Early Start!
            
            ✅ **Starting APY at your age is highly beneficial**:
            - Lower contribution amount for your target pension
            - Maximum time for corpus to grow
            - Maximum tax benefits over your working life
            
            **Consider these additional steps**:
            - Combine APY with other investment options like PPF or NPS for a larger retirement corpus
            - Maximize the pension tier to ₹5,000 as you have many years to contribute
            - Consider additional retirement vehicles as your income grows
            """)
        elif current_age <= 32:
            st.info("""
            ### Good Planning Window
            
            ✅ **You still have a good window for APY benefits**:
            - Reasonable contribution requirement
            - Significant time for benefits to accumulate
            - Good tax advantages over your working years
            
            **Consider these additional steps**:
            - Supplement APY with more market-linked options like NPS Tier 1 account
            - Consider equity investments for potential higher returns on additional savings
            - Review and increase your pension tier as your income increases
            """)
        else:
            st.warning("""
            ### Act Quickly
            
            ⚠️ **Your APY window is narrowing**:
            - Higher contribution requirement due to shorter contribution period
            - APY enrollment closes at age 40
            - Consider if the required contribution fits your budget
            
            **Consider these additional steps**:
            - Supplement APY with more aggressive retirement savings options
            - Look into NPS for additional tax benefits (80CCD(1B))
            - Consider a comprehensive retirement planning strategy beyond APY
            """)
        
        # Comparison with other pension schemes
        st.subheader("🔄 Comparison with Other Schemes")
        
        comparison_data = pd.DataFrame({
            'Feature': [
                'Monthly Contribution',
                'Guaranteed Returns',
                'Market-Linked Returns',
                'Tax Benefits',
                'Withdrawal Flexibility',
                'Risk Level',
                'Government Backing'
            ],
            'APY': [
                f'₹{monthly_contribution:.2f}',
                'Yes (Fixed Pension)',
                'No',
                'Sec 80C (within ₹1.5L)',
                'Only at 60 years',
                'None (Guaranteed)',
                'Full'
            ],
            'NPS': [
                'Min ₹500/month',
                'No',
                'Yes',
                'Sec 80C + 80CCD(1B)',
                'Partial allowed',
                'Market-dependent',
                'Partial'
            ],
            'PPF': [
                'Min ₹500/year',
                'Yes (Interest Rate)',
                'No',
                'Sec 80C (within ₹1.5L)',
                'Partial after 5 years',
                'None (Guaranteed)',
                'Full'
            ]
        })
        
        st.dataframe(comparison_data, use_container_width=True)
        
        # Final considerations
        st.info("""
        ### Final Considerations
        
        1. **APY is ideal if you**:
           - Want a guaranteed government-backed pension
           - Prefer stability over potentially higher but variable returns
           - Have limited access to formal financial instruments
           - Are in earlier stages of your career
        
        2. **APY limitations**:
           - Fixed pension amounts don't adjust for inflation
           - Limited flexibility after enrollment
           - Potentially lower returns compared to market-linked options for long time horizons
        
        3. **Best practices**:
           - Consider APY as one component of a diversified retirement strategy
           - Combine with other investments based on your risk profile and retirement needs
           - Review your retirement portfolio periodically
        """)

def show_nps_calculator():
    """Show the National Pension System (NPS) calculator interface"""
    st.header("NPS Calculator 👵")
    st.write("""
    Plan your retirement with National Pension System (NPS). This calculator helps you estimate your pension corpus
    based on your monthly contributions and expected returns.
    """)
    
    with st.expander("ℹ️ About National Pension System (NPS)", expanded=False):
        st.markdown("""
        #### What is NPS?
        
        The National Pension System (NPS) is a voluntary, long-term retirement savings scheme designed to enable
        systematic savings during the subscriber's working life. It is regulated by the Pension Fund Regulatory and
        Development Authority (PFRDA) in India.
        
        #### Key Features of NPS:
        
        1. **Tax Benefits**:
           - Contributions up to ₹1.5 lakh under Section 80C
           - Additional deduction of up to ₹50,000 under Section 80CCD(1B)
           - Employer contributions up to 10% of salary (Basic + DA) are tax-free
        
        2. **Investment Options**:
           - Active Choice: Choose your own asset allocation
           - Auto Choice: Pre-defined asset allocation based on age
        
        3. **Withdrawal Rules**:
           - At retirement (60 years), 60% can be withdrawn as lump sum (tax-free)
           - Remaining 40% must be used to purchase an annuity for regular pension
           - Partial withdrawals allowed for specific needs after 3 years
        
        4. **Types of NPS Accounts**:
           - Tier I: Mandatory, restricted withdrawals, tax benefits
           - Tier II: Voluntary, flexible withdrawals, no tax benefits
        """)
    
    # User Inputs
    st.subheader("📝 Your Details")
    
    col1, col2 = st.columns(2)
    with col1:
        current_age = st.number_input(
            "Current Age (years)",
            min_value=18,
            max_value=65,
            value=30,
            step=1,
            help="Your current age in years"
        )
        
        retirement_age = st.number_input(
            "Retirement Age (years)",
            min_value=current_age + 1,
            max_value=70,
            value=60,
            step=1,
            help="Age at which you plan to retire (minimum 60 years for NPS)"
        )
    
    with col2:
        monthly_contribution = st.number_input(
            "Monthly Contribution (₹)",
            min_value=500,
            value=5000,
            step=500,
            help="Amount you plan to contribute monthly to NPS"
        )
        
        expected_return = st.number_input(
            "Expected Annual Return (%)",
            min_value=5.0,
            max_value=15.0,
            value=10.0,
            step=0.5,
            help="Expected annual return on your NPS investments"
        )
    
    # Additional Options
    st.subheader("🔍 Additional Options")
    
    col1, col2 = st.columns(2)
    with col1:
        increase_contribution = st.checkbox(
            "Increase contribution annually",
            value=False,
            help="Enable to increase your contribution amount each year"
        )
        
        if increase_contribution:
            annual_increase = st.number_input(
                "Annual Increase in Contribution (%)",
                min_value=1.0,
                max_value=20.0,
                value=5.0,
                step=1.0,
                help="Percentage by which your contribution will increase each year"
            )
        else:
            annual_increase = 0.0
    
    with col2:
        tax_saving_benefit = st.checkbox(
            "Calculate tax saving benefits",
            value=True,
            help="Enable to see potential tax savings from NPS investments"
        )
        
        if tax_saving_benefit:
            tax_slab = st.selectbox(
                "Your Income Tax Slab",
                options=["10%", "20%", "30%"],
                index=2,
                help="Select your highest income tax slab"
            )
            tax_rate = float(tax_slab.strip("%")) / 100
        else:
            tax_rate = 0.0
    
    # Button to calculate
    if st.button("Calculate NPS Benefits", use_container_width=True):
        # Calculate NPS returns
        corpus, lump_sum, annuity, total_investment, total_returns = calculate_nps(
            monthly_contribution, expected_return, current_age, retirement_age
        )
        
        # Calculate tax benefits if selected
        if tax_saving_benefit:
            annual_contribution = monthly_contribution * 12
            sec_80c_benefit = min(annual_contribution, 150000) * tax_rate
            sec_80ccd_benefit = min(annual_contribution, 50000) * tax_rate
            total_tax_benefit = sec_80c_benefit + sec_80ccd_benefit
        
        # Display results
        st.subheader("📊 NPS Benefits Analysis")
        
        # Core metrics
        col1, col2, col3 = st.columns(3)
        with col1:
            st.metric(
                "Total Corpus at Retirement",
                f"₹{corpus:,.2f}",
                help="Estimated total amount in your NPS account at retirement"
            )
        with col2:
            st.metric(
                "Lump Sum (60%)",
                f"₹{lump_sum:,.2f}",
                help="Amount you can withdraw as lump sum at retirement"
            )
        with col3:
            st.metric(
                "Annuity Portion (40%)",
                f"₹{annuity:,.2f}",
                help="Amount that must be used to purchase annuity for pension"
            )
        
        # Investment details
        st.subheader("💰 Investment Details")
        
        col1, col2, col3 = st.columns(3)
        with col1:
            st.metric(
                "Total Investment",
                f"₹{total_investment:,.2f}",
                help="Total amount invested over the years"
            )
        with col2:
            st.metric(
                "Total Returns",
                f"₹{total_returns:,.2f}",
                help="Returns earned on your investments"
            )
        with col3:
            roi_percentage = (total_returns / total_investment) * 100
            st.metric(
                "Return on Investment",
                f"{roi_percentage:.2f}%",
                help="Returns as percentage of your investment"
            )
        
        # Tax benefits
        if tax_saving_benefit:
            st.subheader("🧾 Tax Benefits")
            
            col1, col2, col3 = st.columns(3)
            with col1:
                st.metric(
                    "Sec 80C Benefit (Per Year)",
                    f"₹{sec_80c_benefit:,.2f}",
                    help="Annual tax saving under Section 80C"
                )
            with col2:
                st.metric(
                    "Sec 80CCD(1B) Benefit (Per Year)",
                    f"₹{sec_80ccd_benefit:,.2f}",
                    help="Additional tax saving under Section 80CCD(1B)"
                )
            with col3:
                st.metric(
                    "Total Annual Tax Saving",
                    f"₹{total_tax_benefit:,.2f}",
                    help="Total tax saved annually"
                )
            
            lifetime_tax_saving = total_tax_benefit * (retirement_age - current_age)
            st.info(f"""
            ### Lifetime Tax Savings
            
            By investing in NPS, you could save approximately **₹{lifetime_tax_saving:,.2f}** in taxes over 
            {retirement_age - current_age} years until retirement.
            """)
        
        # Visualization of corpus growth
        st.subheader("📈 NPS Corpus Growth")
        
        years = list(range(retirement_age - current_age + 1))
        corpus_values = []
        investment_values = []
        
        for year in years:
            # Simple calculation for demonstration
            year_investment = monthly_contribution * 12 * year
            year_corpus = monthly_contribution * ((1 + expected_return/(12*100)) * (((1 + expected_return/(12*100))**(year*12) - 1) / (expected_return/(12*100))))
            
            investment_values.append(year_investment)
            corpus_values.append(year_corpus)
        
        # Create DataFrame for visualization
        df = pd.DataFrame({
            'Year': [current_age + y for y in years],
            'Total Investment': investment_values,
            'Corpus Value': corpus_values
        })
        
        # Create chart
        fig = px.line(
            df, 
            x='Year', 
            y=['Total Investment', 'Corpus Value'],
            title=f'NPS Corpus Growth from Age {current_age} to {retirement_age}',
            labels={'value': 'Amount (₹)', 'variable': 'Type'},
            color_discrete_sequence=['#1f77b4', '#ff7f0e']
        )
        
        st.plotly_chart(fig, use_container_width=True)
        
        # Monthly pension estimate
        st.subheader("💵 Estimated Monthly Pension")
        
        annuity_rates = {
            "Conservative": 0.05,    # 5% p.a.
            "Moderate": 0.06,        # 6% p.a.
            "Optimistic": 0.07       # 7% p.a.
        }
        
        col1, col2, col3 = st.columns(3)
        with col1:
            conservative_monthly = (annuity * annuity_rates["Conservative"]) / 12
            st.metric(
                "Conservative Estimate",
                f"₹{conservative_monthly:,.2f}",
                help="Monthly pension based on 5% annuity rate"
            )
        with col2:
            moderate_monthly = (annuity * annuity_rates["Moderate"]) / 12
            st.metric(
                "Moderate Estimate",
                f"₹{moderate_monthly:,.2f}",
                help="Monthly pension based on 6% annuity rate"
            )
        with col3:
            optimistic_monthly = (annuity * annuity_rates["Optimistic"]) / 12
            st.metric(
                "Optimistic Estimate",
                f"₹{optimistic_monthly:,.2f}",
                help="Monthly pension based on 7% annuity rate"
            )
        
        # Retirement adequacy
        st.subheader("🎯 Retirement Adequacy Analysis")
        
        # Assume required retirement corpus is 300 times monthly expense
        # And monthly expense is 70% of current monthly contribution
        monthly_expense_estimate = monthly_contribution * 0.7
        required_corpus = monthly_expense_estimate * 300
        
        corpus_adequacy = (corpus / required_corpus) * 100
        
        # Progress bar for corpus adequacy
        st.write("#### Retirement Corpus Adequacy")
        st.progress(min(corpus_adequacy/100, 1.0), text=f"{corpus_adequacy:.1f}%")
        
        if corpus_adequacy < 70:
            st.error(f"""
            ⚠️ **Retirement Shortfall Alert**
            
            Your estimated NPS corpus may not be sufficient for your retirement needs. Consider one or more of these options:
            - Increase your monthly NPS contribution
            - Explore additional retirement savings options like PPF, mutual funds, etc.
            - Delay your retirement to allow more time for corpus growth
            """)
        elif corpus_adequacy < 100:
            st.warning(f"""
            🔶 **Almost There**
            
            Your estimated NPS corpus is getting close to your retirement needs, but there's still room for improvement. Consider:
            - Gradually increasing your NPS contributions
            - Optimizing your investment options within NPS
            - Supplementing with other investment vehicles
            """)
        else:
            st.success(f"""
            ✅ **On Track for Retirement**
            
            Based on our estimates, your NPS corpus should be sufficient for your retirement needs. Remember to:
            - Regularly review and adjust your contributions as your income grows
            - Stay informed about changes to NPS rules and tax benefits
            - Consider inflation and changing lifestyle needs in your planning
            """)
        
        # Recommendations
        st.subheader("💡 Personalized Recommendations")
        
        years_to_retirement = retirement_age - current_age
        
        if years_to_retirement > 20:
            st.info("""
            ### Long-Term Strategy (20+ years to retirement)
            
            **Asset Allocation Suggestion:**
            - Consider a higher equity allocation (up to 75%) for potentially higher returns
            - Review and rebalance every 3-5 years
            - Take advantage of compounding with consistent contributions
            
            **Action Items:**
            - Maximize tax benefits under Section 80C and 80CCD(1B)
            - Consider Tier II account for additional flexible investments
            - If employed, request employer to contribute to NPS under corporate model
            """)
        elif years_to_retirement > 10:
            st.info("""
            ### Mid-Term Strategy (10-20 years to retirement)
            
            **Asset Allocation Suggestion:**
            - Moderate equity exposure (40-60%)
            - Gradually increase allocation to corporate bonds and government securities
            - Review and rebalance every 2-3 years
            
            **Action Items:**
            - Consider increasing your monthly contribution as your income grows
            - Ensure you're maximizing tax benefits
            - Regularly compare your NPS fund performance with benchmarks
            """)
        else:
            st.info("""
            ### Short-Term Strategy (<10 years to retirement)
            
            **Asset Allocation Suggestion:**
            - Conservative approach with lower equity (15-25%)
            - Higher allocation to government securities and corporate bonds
            - Annual portfolio review and adjustment
            
            **Action Items:**
            - Make catch-up contributions if possible
            - Start planning for annuity selection
            - Consider guaranteed or fixed-return instruments for supplementary retirement savings
            """)

def show_brokerage_calculator():
    """Show the brokerage calculator interface"""
    st.header("Brokerage Calculator 💹")
    st.write("""
    Calculate the brokerage and other charges involved in stock market transactions.
    This calculator helps you understand the total cost impact on your trades.
    """)
    
    with st.expander("ℹ️ About Stock Market Charges", expanded=False):
        st.markdown("""
        #### Trading Charges in Indian Stock Markets
        
        When trading in Indian stock markets, various charges are applicable:
        
        1. **Brokerage**: Fee charged by brokers for executing trades
        2. **Securities Transaction Tax (STT)**: Tax levied on all transactions in the securities market
        3. **Exchange Transaction Charges**: Fees charged by exchanges (NSE, BSE)
        4. **SEBI Charges**: Regulatory fees
        5. **GST**: Applied on brokerage and certain other charges
        6. **Stamp Duty**: State government tax applied on buy transactions
        
        These charges vary based on:
        - Whether it's a buy or sell transaction
        - Whether it's a delivery or intraday trade
        - The exchange being used (NSE, BSE, etc.)
        """)
    
    # Transaction Details
    st.subheader("📝 Transaction Details")
    
    col1, col2 = st.columns(2)
    with col1:
        transaction_type = st.selectbox(
            "Transaction Type",
            ["Buy", "Sell"],
            index=0,
            help="Type of transaction (Buy/Sell)"
        )
        
        exchange = st.selectbox(
            "Exchange",
            ["NSE", "BSE", "Other"],
            index=0,
            help="Stock exchange where the transaction is executed"
        )
    
    with col2:
        delivery = st.radio(
            "Trade Type",
            ["Delivery", "Intraday"],
            index=0,
            horizontal=True,
            help="Delivery (holding shares) or Intraday (squaring off same day)"
        ) == "Delivery"
        
        broker_type = st.selectbox(
            "Broker Type",
            ["Discount Broker", "Full-Service Broker"],
            index=0,
            help="Discount brokers charge less brokerage but offer limited services"
        )
    
    # Stock and Quantity Details
    st.subheader("🔢 Stock and Quantity Details")
    
    col1, col2 = st.columns(2)
    with col1:
        quantity = st.number_input(
            "Quantity (Number of Shares)",
            min_value=1,
            value=100,
            step=1,
            help="Number of shares being traded"
        )
    
    with col2:
        price = st.number_input(
            "Price per Share (₹)",
            min_value=1.0,
            value=500.0,
            step=0.05,
            help="Market price per share"
        )
    
    turnover = quantity * price
    st.metric("Total Transaction Value", f"₹{turnover:,.2f}")
    
    if st.button("Calculate Charges", use_container_width=True):
        # Calculate all charges
        results = calculate_brokerage(transaction_type, exchange, delivery, quantity, price)
        
        # Display summary metrics
        st.subheader("📊 Transaction Cost Analysis")
        
        col1, col2, col3 = st.columns(3)
        with col1:
            st.metric(
                "Total Charges",
                f"₹{results['total_charges']:,.2f}",
                f"{results['percentage_impact']:.3f}% of trade value"
            )
        with col2:
            net_label = "Amount Payable" if transaction_type == "Buy" else "Amount Receivable"
            st.metric(
                net_label,
                f"₹{abs(results['net_amount']):,.2f}"
            )
        with col3:
            st.metric(
                "Transaction Value",
                f"₹{results['turnover']:,.2f}"
            )
        
        # Detailed breakdown of charges
        st.subheader("💰 Detailed Charges Breakdown")
        
        charge_details = pd.DataFrame({
            'Charge Type': [
                'Brokerage',
                'Exchange Transaction Charges',
                'SEBI Charges',
                'Securities Transaction Tax (STT)',
                'GST (18%)',
                'Stamp Duty'
            ],
            'Amount (₹)': [
                results['brokerage'],
                results['transaction_charges'],
                results['sebi_charges'],
                results['stt'],
                results['gst'],
                results['stamp_duty']
            ],
            'Percentage of Trade Value': [
                (results['brokerage'] / turnover) * 100,
                (results['transaction_charges'] / turnover) * 100,
                (results['sebi_charges'] / turnover) * 100,
                (results['stt'] / turnover) * 100,
                (results['gst'] / turnover) * 100,
                (results['stamp_duty'] / turnover) * 100
            ]
        })
        
        st.dataframe(
            charge_details.style.format({
                'Amount (₹)': '₹{:,.4f}',
                'Percentage of Trade Value': '{:.4f}%'
            }),
            use_container_width=True
        )
        
        # Visualization
        fig = px.pie(
            charge_details,
            values='Amount (₹)',
            names='Charge Type',
            title=f'Breakdown of Trading Charges for ₹{turnover:,.2f} {transaction_type} Transaction',
            color_discrete_sequence=px.colors.sequential.Viridis
        )
        
        # Only show labels for charges that are significant enough to be visible
        fig.update_traces(textinfo='percent+label', textposition='inside')
        
        st.plotly_chart(fig, use_container_width=True)
        
        # Insights and recommendations
        st.subheader("💡 Insights and Recommendations")
        
        # Different insights based on transaction type and charges
        if results['percentage_impact'] > 0.5:
            st.warning(f"""
            **High Impact of Charges**:
            - The total charges represent {results['percentage_impact']:.2f}% of your transaction value.
            - For small transactions, consider increasing your order size to improve cost efficiency.
            """)
        else:
            st.success(f"""
            **Reasonable Transaction Costs**:
            - The total charges represent {results['percentage_impact']:.2f}% of your transaction value.
            - This is within the typical range for market transactions.
            """)
        
        if transaction_type == "Buy" and delivery:
            st.info("""
            **For Long-Term Investors:**
            - Higher STT and stamp duty are applied to delivery-based buy transactions.
            - These costs are usually justified for long-term investments where potential gains outweigh transaction costs.
            - Consider the impact of these charges when planning your investment strategy, especially for small amounts.
            """)
        elif not delivery:
            st.info("""
            **For Intraday Traders:**
            - Intraday trading has lower STT, but remember you'll pay charges twice (for buy and sell).
            - For active traders, even small percentage charges can significantly impact overall profitability.
            - Consider using discount brokers with flat fee structures if you trade frequently.
            """)
        
        # Tax implications
        st.subheader("🧾 Tax Implications")
        
        if delivery:
            st.write("""
            **For Delivery-Based Trades:**
            - Long-term capital gains (held > 1 year): 10% tax on gains above ₹1 lakh
            - Short-term capital gains (held < 1 year): 15% tax on total gains
            - STT paid is not allowed as a deduction from income
            """)
        else:
            st.write("""
            **For Intraday Trades:**
            - Profits are considered as business income and taxed as per your income tax slab
            - You can claim trading expenses as business expenses
            - Traders with significant volume should consider maintaining books of accounts
            """)

def show_celebration_animation(value, message):
    """Show a celebratory animation for significant achievements"""
    celebration_html = f"""
    <div class="celebration" style="text-align: center; animation: bounce 1s infinite;">
        <h2 style="font-size: 2em; color: #FFD700;">{message}</h2>
        <h3 style="color: #FFD700;">₹{value:,.2f}</h3>
        <style>
            @keyframes bounce {{
                0%, 100% {{ transform: translateY(0); }}
                50% {{ transform: translateY(-20px); }}
            }}
            .celebration {{
                padding: 20px;
                background: linear-gradient(45deg, rgba(255,215,0,0.1), rgba(255,215,0,0.2));
                border-radius: 10px;
                margin: 20px 0;
            }}
        </style>
    </div>
    """
    st.markdown(celebration_html, unsafe_allow_html=True)

def show():
    st.title("💰 Smart Financial Calculators")
    st.write("""
    Comprehensive financial planning tools to help you make informed decisions about your money.
    Choose a calculator from the options below.
    """)
    
    # Show financial goals integration in sidebar
    with st.sidebar:
        st.markdown("### 🎯 Your Financial Goals")
        
        # Get goal statistics from goal_settings module
        goal_stats = get_quick_stats()
        
        if goal_stats and goal_stats["total_goals"] > 0:
            # Display summary statistics
            st.metric(
                "Total Goals",
                f"{goal_stats['total_goals']}",
                help="Number of financial goals you've set"
            )
            
            st.metric(
                "Target Amount",
                f"₹{goal_stats['total_target']:,.2f}",
                help="Total amount needed for all your goals"
            )
            
            st.progress(goal_stats['completion_percentage']/100, 
                        text=f"Overall: {goal_stats['completion_percentage']:.1f}%")
            
            # Display top priority goal if available
            if goal_stats["top_goal"]:
                st.markdown("### 🔝 Top Priority Goal")
                st.markdown(f"**{goal_stats['top_goal']['name']}**")
                st.progress(
                    goal_stats['top_goal']['percentage']/100,
                    text=f"{goal_stats['top_goal']['percentage']:.1f}%"
                )
                st.markdown(f"Target: ₹{goal_stats['top_goal']['target']:,.2f}")
                st.markdown(f"Current: ₹{goal_stats['top_goal']['current']:,.2f}")
                
                # Quick link to goal settings
                if st.button("✏️ Manage Goals", use_container_width=True):
                    js = f"""
                    <script>
                    window.parent.location.href = "/goal_settings";
                    </script>
                    """
                    st.components.v1.html(js)
        else:
            st.info("No financial goals set yet.")
            if st.button("➕ Add Your First Goal", use_container_width=True):
                js = f"""
                <script>
                window.parent.location.href = "/goal_settings";
                </script>
                """
                st.components.v1.html(js)
        
        # Horizontal line for separation
        st.markdown("---")

    st.warning("""
    **Important Disclaimer:** All calculations and projections shown in these calculators are based on 
    historical data and assumptions. Past performance does not guarantee future returns. These tools are 
    for educational purposes only. Please consult with qualified financial advisors before making 
    investment decisions.
    """)

    calculators = [
        # Interest & General Calculators
        "Simple Interest 💹",
        "Compound Interest 📊",
        "CAGR Calculator 📊",
        "Interest Rate Calculator 📊",
        "Inflation Calculator 💸",
        "Discount Calculator 💰",
        "GST Calculator 🧾",
        "Gratuity Calculator 💼",
        
        # Salary & Tax Calculators
        "Salary Calculator 💵",
        "HRA Calculator 🏠",
        "Income Tax Calculator 💰",
        
        # Investment Calculators
        "SIP Calculator 📈",
        "Lumpsum Calculator 📈",
        "SWP Calculator 💸",
        "STP Calculator 📊",
        "Stock Average Calculator 📈",
        "Brokerage Calculator 💹",
        "Regular vs Direct Mutual Fund Calculator 📊",
        
        # Retirement & Pension Calculators
        "Retirement Planning 👴",
        "NPS Calculator 👵",
        "APY Calculator 👴",
        
        # Fixed Income & Savings Calculators
        "PPF Calculator 💰",
        "SSY Calculator 👧",
        "NSC Calculator 📃",
        "FD Calculator 🏦",
        "RD Calculator 💹",
        "Post Office PPF Calculator 🏤",
        "Post Office FD Calculator 🏤",
        "Post Office RD Calculator 🏤",
        "Post Office MIS Calculator 🏤",
        "HDFC FD Calculator 🏦",
        "SBI FD Calculator 🏦",
        "ICICI FD Calculator 🏦",
        "Axis Bank FD Calculator 🏦",
        
        # Loan Calculators
        "Loan EMI 💳",
        "Home Loan EMI Calculator 🏠",
        "Personal Loan EMI Calculator 💵",
        "Car Loan EMI Calculator 🚗",
        "Bike Loan EMI Calculator 🏍️",
        "Education Loan EMI Calculator 🎓",
        "Credit Card EMI Calculator 💳",
        "SBI Home Loan EMI Calculator 🏦",
        "HDFC Home Loan EMI Calculator 🏦",
        "SBI Personal Loan EMI Calculator 🏦",
        "HDFC Personal Loan EMI Calculator 🏦",
        "ICICI Personal Loan EMI Calculator 🏦",
        "Axis Personal Loan EMI Calculator 🏦",
        
        # Other Financial Calculators
        "Term Insurance Calculator 🛡️",
        "Education Savings 🎓",
        "Emergency Fund 🏦",
        "Home Down Payment 🏠",
        "Net Worth Tracker 💎",
        "Investment Returns 📊"
    ]

    # Add checkmarks to implemented calculators to make them more visible
    implemented_calculators = [
        "Simple Interest 💹",
        "Compound Interest 📊", 
        "SIP Calculator 📈",
        "SWP Calculator 💸",
        "STP Calculator 📊",
        "Retirement Planning 👴",
        "NPS Calculator 👵",
        "APY Calculator 👴",
        "Term Insurance Calculator 🛡️",
        "Education Savings 🎓",
        "Emergency Fund 🏦",
        "Home Down Payment 🏠",
        "Net Worth Tracker 💎",
        "Gratuity Calculator 💼",
        "Investment Returns 📊",
        "Loan EMI 💳",
        "Home Loan EMI Calculator 🏠",
        "Personal Loan EMI Calculator 💵",
        "Car Loan EMI Calculator 🚗",
        "Bike Loan EMI Calculator 🏍️",
        "Credit Card EMI Calculator 💳",
        "Education Loan EMI Calculator 🎓",
        "Health Insurance Premium Calculator 🏥",
        "Gold Investment Calculator 💍",
        "Regular vs Direct Mutual Fund Calculator 📊",
        "CAGR Calculator 📊",
        "HRA Calculator 🏠",
        "Lumpsum Calculator 📈",
        "PPF Calculator 💰",
        "FD Calculator 🏦",
        "RD Calculator 💹",
        "Income Tax Calculator 💰",
        "Interest Rate Calculator 📊",
        "Inflation Calculator 💸",
        "Discount Calculator 💰",
        "GST Calculator 🧾",
        "Stock Average Calculator 📈",
        "Salary Calculator 💼",
        "Brokerage Calculator 💹",
        "SSY Calculator 👧",
        "NSC Calculator 📃",
        "Post Office PPF Calculator 🏤",
        "Post Office FD Calculator 🏤",
        "Post Office RD Calculator 🏤",
        "Post Office MIS Calculator 🏤",
        "SBI FD Calculator 🏦",
        "HDFC FD Calculator 🏦",
        "ICICI FD Calculator 🏦",
        "Axis Bank FD Calculator 🏦",
        "Kotak Mahindra Bank FD Calculator 🏦",
        "Yes Bank FD Calculator 🏦",
        "SBI Home Loan EMI Calculator 🏦",
        "HDFC Home Loan EMI Calculator 🏦",
        "SBI Personal Loan EMI Calculator 🏦",
        "HDFC Personal Loan EMI Calculator 🏦",
        "ICICI Personal Loan EMI Calculator 🏦",
        "Axis Personal Loan EMI Calculator 🏦"
    ]
    
    calculator_options = []
    for calc in calculators:
        if calc in implemented_calculators:
            calculator_options.append(f"{calc} ✅")
        else:
            calculator_options.append(calc)
    
    selected_option = st.selectbox("Select Calculator", calculator_options)
    
    # Remove the checkmark for processing
    calculator = selected_option.replace(" ✅", "")
    
    # Try new calculators first
    if calculator == "Lumpsum Calculator 📈":
        show_lumpsum_calculator()
        return
    elif calculator == "HRA Calculator 🏠":
        show_hra_calculator()
        return
    elif calculator == "PPF Calculator 💰":
        show_ppf_calculator()
        return
    elif calculator == "FD Calculator 🏦":
        show_fd_calculator()
        return
    elif calculator == "RD Calculator 💹":
        show_rd_calculator()
        return
    elif calculator == "Income Tax Calculator 💰":
        show_income_tax_calculator()
        return
    elif calculator == "Home Loan EMI Calculator 🏠":
        show_home_loan_calculator()
        return
    elif calculator == "Personal Loan EMI Calculator 💵":
        show_personal_loan_calculator()
        return
    elif calculator == "Car Loan EMI Calculator 🚗":
        show_car_loan_calculator()
        return
    elif calculator == "Bike Loan EMI Calculator 🏍️":
        show_bike_loan_calculator()
        return
    elif calculator == "Credit Card EMI Calculator 💳":
        show_credit_card_emi_calculator()
        return
    elif calculator == "Education Loan EMI Calculator 🎓":
        show_education_loan_calculator()
        return
    elif calculator == "Health Insurance Premium Calculator 🏥":
        show_health_insurance_calculator()
        return
    elif calculator == "Gold Investment Calculator 💍":
        show_gold_investment_calculator()
        return
    elif calculator == "Stock Average Calculator 📈":
        show_stock_average_calculator()
        return
    elif calculator == "Regular vs Direct Mutual Fund Calculator 📊":
        show_regular_vs_direct_calculator()
        return
    elif calculator == "STP Calculator 📊":
        show_stp_calculator()
        return
    elif calculator == "Salary Calculator 💼":
        show_salary_calculator()
        return
    elif calculator == "Brokerage Calculator 💹":
        show_brokerage_calculator()
        return
    elif calculator == "NPS Calculator 👵":
        show_nps_calculator()
        return
    elif calculator == "APY Calculator 👴":
        show_apy_calculator()
        return
    elif calculator == "Term Insurance Calculator 🛡️":
        from pages.term_insurance_calculator import show_term_insurance_calculator
        show_term_insurance_calculator()
        return
    elif calculator == "SSY Calculator 👧":
        show_ssy_calculator()
        return
        
    elif calculator == "NSC Calculator 📃":
        show_nsc_calculator()
        return
        
    elif calculator == "Post Office PPF Calculator 🏤":
        show_post_office_ppf_calculator()
        return
        
    elif calculator == "Post Office FD Calculator 🏤":
        show_post_office_fd_calculator()
        return
        
    elif calculator == "Post Office RD Calculator 🏤":
        show_post_office_rd_calculator()
        return
        
    elif calculator == "Post Office MIS Calculator 🏤":
        show_post_office_mis_calculator()
        return
        
    elif calculator == "SBI FD Calculator 🏦":
        show_sbi_fd_calculator()
        return
        
    elif calculator == "HDFC FD Calculator 🏦":
        show_hdfc_fd_calculator()
        return
        
    elif calculator == "ICICI FD Calculator 🏦":
        show_icici_fd_calculator()
        return
        
    elif calculator == "Axis Bank FD Calculator 🏦":
        show_axis_fd_calculator()
        return
        
    elif calculator == "Kotak Mahindra Bank FD Calculator 🏦":
        show_kotak_fd_calculator()
        return
    
    elif calculator == "Yes Bank FD Calculator 🏦":
        from pages.yes_bank_fd_calculator import show_yes_bank_fd_calculator
        show_yes_bank_fd_calculator()
        return
        
    elif calculator == "SBI Home Loan EMI Calculator 🏦":
        from utils.calculators import show_sbi_home_loan_calculator
        show_sbi_home_loan_calculator()
        return
        
    elif calculator == "HDFC Home Loan EMI Calculator 🏦":
        from utils.calculators import show_hdfc_home_loan_calculator
        show_hdfc_home_loan_calculator()
        return
        
    elif calculator == "SBI Personal Loan EMI Calculator 🏦":
        from utils.calculators import show_sbi_personal_loan_calculator
        show_sbi_personal_loan_calculator()
        return
        
    elif calculator == "HDFC Personal Loan EMI Calculator 🏦":
        from utils.calculators import show_hdfc_personal_loan_calculator
        show_hdfc_personal_loan_calculator()
        return
        
    elif calculator == "ICICI Personal Loan EMI Calculator 🏦":
        from utils.calculators import show_icici_personal_loan_calculator
        show_icici_personal_loan_calculator()
        return
        
    elif calculator == "Axis Personal Loan EMI Calculator 🏦":
        from utils.calculators import show_axis_personal_loan_calculator
        show_axis_personal_loan_calculator()
        return
    
    # Fall back to the general function if needed
    if new_calculators_available and add_new_calculators(calculator):
        st.session_state.used_new_calculator = True
        return
    
    # Simple Interest Calculator
    if calculator == "Simple Interest 💹":
        st.header("Simple Interest Calculator")
        st.write("""
        Calculate simple interest on your investments or loans. 
        Simple interest is calculated only on the principal amount, unlike compound interest.
        """)

        col1, col2 = st.columns(2)
        with col1:
            principal = st.number_input(
                "Principal Amount (₹)",
                min_value=0,
                value=10000,
                step=1000
            )
            interest_rate = st.number_input(
                "Annual Interest Rate (%)",
                min_value=0.0,
                max_value=30.0,
                value=5.0,
                step=0.1
            )

        with col2:
            time_period = st.number_input(
                "Time Period (Years)",
                min_value=1,
                max_value=30,
                value=5
            )

        if st.button("Calculate Interest", use_container_width=True):
            interest, total_amount = calculate_simple_interest(principal, interest_rate, time_period)

            # Display detailed results
            st.subheader("📊 Detailed Calculation Results")

            col1, col2, col3 = st.columns(3)
            with col1:
                st.metric(
                    "Principal Amount",
                    f"₹{principal:,.2f}"
                )
            with col2:
                st.metric(
                    "Interest Earned",
                    f"₹{interest:,.2f}"
                )
            with col3:
                st.metric(
                    "Total Amount",
                    f"₹{total_amount:,.2f}"
                )

            # Create year-wise breakdown
            years = list(range(time_period + 1))
            amounts = [principal + (interest/time_period * year) for year in years]

            df = pd.DataFrame({
                'Year': years,
                'Amount': amounts
            })

            fig = px.line(
                df,
                x='Year',
                y='Amount',
                title='Simple Interest Growth Over Time',
                labels={'Amount': 'Amount (₹)'}
            )
            st.plotly_chart(fig, use_container_width=True)

            # Additional insights
            st.info("""
            ### 💡 Key Insights
            1. In simple interest, interest is calculated only on the principal amount
            2. Total interest remains constant throughout the period
            3. Growth is linear unlike compound interest
            4. Suitable for short-term loans or investments
            """)

            # Comparison with Compound Interest
            compound_amount = calculate_compound_interest(principal, interest_rate, time_period)
            st.warning(f"""
            ### 📈 Comparison with Compound Interest
            - Simple Interest Total: ₹{total_amount:,.2f}
            - Compound Interest Total: ₹{compound_amount:,.2f}
            - Difference: ₹{(compound_amount - total_amount):,.2f}
            """)

    # SWP Calculator
    elif calculator == "SWP Calculator 💸":
        st.header("Systematic Withdrawal Plan Calculator")
        st.write("""
        Plan your regular withdrawals from a lump sum investment while maintaining growth.
        SWP helps in creating a steady income stream from your investments.
        """)
        st.warning("""
        **Disclaimer:** SWP calculations are based on projected returns. Actual returns may vary.  Consult a financial advisor before making investment decisions.
        """)

        col1, col2 = st.columns(2)
        with col1:
            initial_corpus = st.number_input(
                "Initial Investment Corpus (₹)",
                min_value=100000,
                value=1000000,
                step=100000
            )
            withdrawal_rate = st.number_input(
                "Annual Withdrawal Rate (%)",
                min_value=1.0,
                max_value=20.0,
                value=6.0,
                step=0.1
            )

        with col2:
            expected_return = st.number_input(
                "Expected Annual Return (%)",
                min_value=0.0,
                max_value=30.0,
                value=10.0,
                step=0.1
            )
            time_period = st.number_input(
                "Time Period (Years)",
                min_value=1,
                max_value=30,
                value=10
            )

        if st.button("Calculate SWP", use_container_width=True):
            results = calculate_swp_returns(
                initial_corpus,
                withdrawal_rate,
                expected_return,
                time_period
            )

            # Display key metrics
            st.subheader("📊 SWP Analysis")

            col1, col2, col3 = st.columns(3)
            with col1:
                st.metric(
                    "Monthly Withdrawal",
                    f"₹{results['monthly_withdrawal']:,.2f}"
                )
            with col2:
                st.metric(
                    "Total Withdrawal",
                    f"₹{results['total_withdrawal']:,.2f}"
                )
            with col3:
                st.metric(
                    "Final Corpus",
                    f"₹{results['final_corpus']:,.2f}",
                    f"{((results['final_corpus']/initial_corpus - 1) * 100):,.1f}%"
                )

            # Create visualization
            months = list(range(time_period * 12 + 1))
            df = pd.DataFrame({
                'Month': months,
                'Corpus': results['corpus_values'],
                'Cumulative Withdrawal': np.cumsum(results['withdrawal_values'])
            })

            fig = px.line(
                df,
                x='Month',
                y=['Corpus', 'Cumulative Withdrawal'],
                title='SWP Performance Over Time',
                labels={'value': 'Amount (₹)', 'variable': 'Type'}
            )
            st.plotly_chart(fig, use_container_width=True)

            # Detailed insights
            st.info("""
            ### 💡 Key Insights
            1. Higher withdrawal rates may deplete corpus faster
            2. Regular returns help sustain withdrawals
            3. Consider inflation impact on withdrawals
            4. Monitor corpus regularly
            """)

            # Sustainability analysis
            sustainability_ratio = results['final_corpus'] / initial_corpus
            if sustainability_ratio >= 1:
                st.success("""
                ✅ **Sustainable Withdrawal Plan**
                Your corpus is growing despite withdrawals
                """)
            elif sustainability_ratio >= 0.5:
                st.warning("""
                ⚠️ **Moderate Depletion**
                Consider reducing withdrawal rate for longer sustainability
                """)
            else:
                st.error("""
                🚨 **High Depletion Risk**
                Current withdrawal rate may not be sustainable
                """)

    # SIP Calculator
    elif calculator == "SIP Calculator 📈":
        st.header("SIP Calculator")
        st.write("""
        Calculate the power of systematic investing and see how your monthly investments can grow over time.
        """)
        st.warning("""
        **Disclaimer:** SIP calculations are based on projected returns. Actual returns may vary significantly due to market fluctuations. This calculator is for illustrative purposes only and should not be considered financial advice. Consult a financial advisor for personalized guidance.
        """)

        col1, col2 = st.columns(2)
        with col1:
            monthly_sip = st.number_input(
                "Monthly SIP Amount (₹)",
                min_value=500,
                value=5000,
                step=500
            )
            investment_period = st.number_input(
                "Investment Period (Years)",
                min_value=1,
                max_value=40,
                value=10
            )

        with col2:
            expected_return = st.number_input(
                "Expected Annual Return (%)",
                min_value=1.0,
                max_value=30.0,
                value=12.0,
                step=0.1
            )

        if st.button("Calculate SIP Returns", use_container_width=True):
            future_value, total_investment, returns, years, invested_amounts, future_values = calculate_sip_returns(
                monthly_sip, expected_return, investment_period
            )

            # Display key metrics
            col1, col2, col3 = st.columns(3)
            with col1:
                st.metric(
                    "Total Investment",
                    f"₹{total_investment:,.2f}"
                )
            with col2:
                st.metric(
                    "Expected Returns",
                    f"₹{returns:,.2f}"
                )
            with col3:
                st.metric(
                    "Future Value",
                    f"₹{future_value:,.2f}"
                )

            # Show celebration for significant returns
            if returns > total_investment:
                show_celebration_animation(
                    returns,
                    "🎉 Excellent Returns Generated! 🎉"
                )

            # Additional Analysis
            st.subheader("📊 Detailed Investment Analysis")

            # Yearly Breakdown
            st.write("### Year-wise Investment Growth")
            yearly_breakdown = pd.DataFrame({
                'Year': years,
                'Invested Amount': invested_amounts,
                'Future Value': future_values,
                'Returns': [fv - inv for fv, inv in zip(future_values, invested_amounts)],
                'Returns %': [(fv - inv)/inv * 100 if inv > 0 else 0 
                            for fv, inv in zip(future_values, invested_amounts)]
            })

            st.dataframe(yearly_breakdown.style.format({
                'Invested Amount': '₹{:,.2f}',
                'Future Value': '₹{:,.2f}',
                'Returns': '₹{:,.2f}',
                'Returns %': '{:.1f}%'
            }))

            st.info("""
            ### 💡 Investment Strategy Analysis
            1. **Risk Analysis**: 
               - Long-term investment reduces market timing risk
               - Regular investments help average out market volatility
            
            2. **Return Analysis**:
               - CAGR (Compound Annual Growth Rate): {:.1f}%
               - Total Returns: {:.1f}% of invested amount
               - Monthly Investment Required: ₹{:,.2f}
            
            3. **Time Horizon Impact**:
               - Investment Duration: {} years
               - Power of Compounding: ₹{:,.2f} extra earned through compounding
               - Time contribution to wealth: {:.1f}%
            """.format(
                expected_return,
                (returns/total_investment) * 100,
                monthly_sip,
                investment_period,
                future_value - total_investment - returns,
                (future_value - total_investment - returns)/future_value * 100
            ))

            st.warning("""
            **Investment Disclaimer:** 
            1. The projections shown are based on assumed constant returns
            2. Actual returns will vary based on market conditions
            3. Past performance does not guarantee future results
            4. Consider consulting a financial advisor for personalized advice
            """)

            # Investment Type Descriptions
            st.subheader("Investment Type Details")
            st.info("""
            **Note:** Investment characteristics and returns shown here are based on historical data 
            and general market behavior. Actual returns may vary significantly. Different market 
            conditions can affect both risk and return levels.
            """)
            
            # Goal integration section
            with st.expander("💡 Create a Goal for This Investment"):
                st.markdown("""
                Want to track this investment as a financial goal? Create a goal to monitor your progress!
                """)
                
                goal_name = st.text_input("Goal Name", value=f"SIP Investment ({monthly_sip}/month)")
                
                # Determine goal type based on investment period
                goal_type = "Short-Term" if investment_period <= 3 else "Mid-Term" if investment_period <= 7 else "Long-Term"
                st.write(f"Goal Type: **{goal_type}**")
                
                # Auto-fill values from calculator
                col1, col2 = st.columns(2)
                with col1:
                    st.write(f"Target Amount: **₹{future_value:,.2f}**")
                with col2:
                    st.write(f"Monthly Savings: **₹{monthly_sip:,.2f}**")
                
                current_savings = st.number_input(
                    "Current Savings (Initial Investment)",
                    min_value=0,
                    value=0,
                    step=1000,
                    help="Enter any amount you've already saved towards this goal"
                )
                
                if st.button("Create Goal", use_container_width=True):
                    
                    # Store goal data in session state for transfer to goal_settings
                    if "temp_goal_data" not in st.session_state:
                        st.session_state.temp_goal_data = {}
                    
                    st.session_state.temp_goal_data = {
                        "name": goal_name,
                        "category": goal_type,
                        "target_amount": float(future_value),
                        "current_savings": float(current_savings),
                        "monthly_savings": float(monthly_sip),
                        "time_period": int(investment_period),
                        "expected_return": float(expected_return)
                    }
                    
                    # Success message
                    st.success("Goal information prepared! Redirecting to goal settings...")
                    
                    # Use JavaScript to redirect to goal_settings
                    js = """
                    <script>
                    setTimeout(function() {
                        window.parent.location.href = "/goal_settings";
                    }, 1500);
                    </script>
                    """
                    st.components.v1.html(js)


            # Recommendations
            if investment_period < 5:
                st.warning("""
                ⚠️ **Short-term Investment Alert**
                - Consider longer investment horizon for better returns
                - Short-term market volatility can affect returns
                - Review risk-return expectations
                """)
            elif investment_period > 15:
                st.success("""
                ✅ **Long-term Wealth Creation Strategy**
                - Excellent long-term commitment
                - Consider increasing monthly investment with income growth
                - Review and rebalance portfolio periodically
                """)

            # Create growth visualization
            df = pd.DataFrame({
                'Year': years,
                'Invested Amount': invested_amounts,
                'Future Value': future_values
            })

            fig = px.line(
                df,
                x='Year',
                y=['Invested Amount', 'Future Value'],
                title='SIP Growth Over Time',
                labels={'value': 'Amount (₹)', 'variable': 'Type'}
            )
            st.plotly_chart(fig, use_container_width=True)

            # Compare with lump sum
            st.subheader("💡 SIP vs Lump Sum Comparison")
            lump_sum = monthly_sip * 12 * investment_period
            lump_sum_future = lump_sum * (1 + expected_return/100)**investment_period

            comparison_df = pd.DataFrame({
                'Investment Type': ['SIP', 'Lump Sum'],
                'Investment Amount': [total_investment, lump_sum],
                'Future Value': [future_value, lump_sum_future],
                'Returns': [returns, lump_sum_future - lump_sum]
            })

            st.table(comparison_df.set_index('Investment Type').style.format({
                'Investment Amount': '₹{:,.2f}',
                'Future Value': '₹{:,.2f}',
                'Returns': '₹{:,.2f}'
            }))

            st.info("""
            ### 💡 Key Benefits of SIP
            1. **Rupee Cost Averaging**: Buy more units when prices are low
            2. **Power of Compounding**: Returns on returns
            3. **Disciplined Investing**: Regular savings habit
            4. **Flexibility**: Start with small amounts
            """)

    # Compound Interest Calculator
    elif calculator == "Compound Interest 📊":
        st.header("Compound Interest Calculator")
        st.write("""
        Calculate how your investments grow over time with the power of compound interest.
        Include regular contributions to see your wealth build faster!
        """)
        st.warning("""
        **Disclaimer:** Compound interest calculations assume a constant interest rate.  Actual returns may vary due to market conditions and other factors.  This tool is for educational purposes only and does not constitute financial advice.
        """)

        col1, col2 = st.columns(2)
        with col1:
            principal = st.number_input(
                "Initial Investment (₹)",
                min_value=0,
                value=10000,
                step=1000
            )
            interest_rate = st.number_input(
                "Annual Interest Rate (%)",
                min_value=0.0,
                max_value=30.0,
                value=8.0,
                step=0.1
            )

        with col2:
            time_period = st.number_input(
                "Time Period (Years)",
                min_value=1,
                max_value=50,
                value=10
            )
            monthly_contribution = st.number_input(
                "Monthly Contribution (₹)",
                min_value=0,
                value=1000,
                step=100
            )

        if st.button("Calculate Growth", use_container_width=True):
            # Calculate year-by-year growth
            years = list(range(time_period + 1))
            amounts = []
            amount = principal

            for year in years:
                amounts.append(amount)
                contribution = monthly_contribution * 12
                amount = (amount + contribution) * (1 + interest_rate/100)

            # Create DataFrame for visualization
            df = pd.DataFrame({
                'Year': years,
                'Amount': amounts
            })

            # Display results
            final_amount = amounts[-1]
            total_investment = principal + monthly_contribution * 12 * time_period
            total_interest = final_amount - total_investment

            col1, col2, col3 = st.columns(3)
            with col1:
                st.metric(
                    "Final Amount",
                    f"₹{final_amount:,.2f}"
                )
            with col2:
                st.metric(
                    "Total Investment",
                    f"₹{total_investment:,.2f}"
                )
            with col3:
                st.metric(
                    "Interest Earned",
                    f"₹{total_interest:,.2f}"
                )

            # Plot growth
            fig = px.line(
                df,
                x='Year',
                y='Amount',
                title='Investment Growth Over Time',
                labels={'Amount': 'Amount (₹)'}
            )
            st.plotly_chart(fig, use_container_width=True)


    elif calculator == "Retirement Planning 👴":
        st.header("Retirement Planning Calculator")
        st.write("""
        Plan your retirement by calculating how much you need to save monthly to 
        achieve your retirement goals.
        """)
        st.warning("""
        **Disclaimer:** Retirement planning calculations are estimates based on assumptions about inflation, investment returns, and expenses.  Actual results may vary. Consult a financial advisor for personalized retirement planning.
        """)

        col1, col2 = st.columns(2)
        with col1:
            current_age = st.number_input(
                "Current Age",
                min_value=18,
                max_value=70,
                value=30
            )
            retirement_age = st.number_input(
                "Retirement Age",
                min_value=current_age + 1,
                max_value=80,
                value=60
            )
            life_expectancy = st.number_input(
                "Life Expectancy",
                min_value=retirement_age + 1,
                max_value=100,
                value=85
            )

        with col2:
            monthly_expenses = st.number_input(
                "Current Monthly Expenses (₹)",
                min_value=0,
                value=50000,
                step=1000
            )
            inflation_rate = st.number_input(
                "Expected Inflation Rate (%)",
                min_value=0.0,
                max_value=15.0,
                value=6.0,
                step=0.1
            )
            return_rate = st.number_input(
                "Expected Return Rate (%)",
                min_value=0.0,
                max_value=20.0,
                value=8.0,
                step=0.1
            )

        if st.button("Calculate Retirement Plan", use_container_width=True):
            total_needed, monthly_savings = calculate_retirement_needs(
                current_age, retirement_age, life_expectancy,
                monthly_expenses, inflation_rate, return_rate
            )

            years_to_retirement = retirement_age - current_age
            retirement_duration = life_expectancy - retirement_age

            col1, col2, col3 = st.columns(3)
            with col1:
                st.metric(
                    "Total Amount Needed",
                    f"₹{total_needed:,.2f}"
                )
            with col2:
                st.metric(
                    "Monthly Savings Required",
                    f"₹{monthly_savings:,.2f}"
                )
            with col3:
                st.metric(
                    "Years to Retirement",
                    f"{years_to_retirement} years"
                )

            # Create visualization of savings growth
            years = list(range(years_to_retirement + 1))
            savings = []
            amount = 0

            for year in years:
                savings.append(amount)
                amount = (amount + monthly_savings * 12) * (1 + return_rate/100)

            df = pd.DataFrame({
                'Year': years,
                'Savings': savings
            })

            fig = px.line(
                df,
                x='Year',
                y='Savings',
                title='Retirement Savings Growth',
                labels={'Savings': 'Amount (₹)'}
            )
            st.plotly_chart(fig, use_container_width=True)

    elif calculator == "Education Savings 🎓":
        st.header("Education Savings Calculator")
        st.write("""
        Plan for your children's education by calculating how much you need to save
        considering education inflation and investment returns.
        """)
        st.warning("""
        **Disclaimer:** Education savings calculations are estimates based on projected education costs and investment returns.  Actual costs and returns may vary.  This tool is for planning purposes and should not be considered financial advice.
        """)

        col1, col2 = st.columns(2)
        with col1:
            current_cost = st.number_input(
                "Current Annual Education Cost (₹)",
                min_value=0,
                value=200000,
                step=10000
            )
            years_to_start = st.number_input(
                "Years until Education Starts",
                min_value=1,
                max_value=20,
                value=10
            )

        with col2:
            education_duration = st.number_input(
                "Duration of Education (Years)",
                min_value=1,
                max_value=10,
                value=4
            )
            education_inflation = st.number_input(
                "Education Inflation Rate (%)",
                min_value=0.0,
                max_value=15.0,
                value=10.0,
                step=0.1
            )
            expected_return = st.number_input(
                "Expected Investment Return (%)",
                min_value=0.0,
                max_value=20.0,
                value=8.0,
                step=0.1
            )

        if st.button("Calculate Education Plan", use_container_width=True):
            # Calculate future education cost
            future_annual_cost = current_cost * (1 + education_inflation/100)**years_to_start
            total_education_cost = future_annual_cost * education_duration

            # Calculate required monthly savings
            monthly_savings = total_education_cost / ((1 + expected_return/100)**years_to_start - 1) / (expected_return/100 * 12)

            col1, col2, col3 = st.columns(3)
            with col1:
                st.metric(
                    "Future Annual Cost",
                    f"₹{future_annual_cost:,.2f}"
                )
            with col2:
                st.metric(
                    "Total Education Cost",
                    f"₹{total_education_cost:,.2f}"
                )
            with col3:
                st.metric(
                    "Monthly Savings Needed",
                    f"₹{monthly_savings:,.2f}"
                )

            # Show savings growth visualization
            years = list(range(years_to_start + 1))
            savings = []
            amount = 0

            for year in years:
                savings.append(amount)
                amount = (amount + monthly_savings * 12) * (1 + expected_return/100)

            df = pd.DataFrame({
                'Year': years,
                'Savings': savings
            })

            fig = px.line(
                df,
                x='Year',
                y='Savings',
                title='Education Fund Growth',
                labels={'Savings': 'Amount (₹)'}
            )
            st.plotly_chart(fig, use_container_width=True)

    elif calculator == "Emergency Fund 🏦":
        st.header("Emergency Fund Calculator")
        st.write("""
        Calculate how much you should have in your emergency fund based on your
        monthly expenses and risk factors.
        """)

        col1, col2 = st.columns(2)
        with col1:
            monthly_expenses = st.number_input(
                "Monthly Expenses (₹)",
                min_value=0,
                value=50000,
                step=1000
            )
            dependents = st.number_input(
                "Number of Dependents",
                min_value=0,
                max_value=10,
                value=0
            )

        with col2:
            employment_stability = st.selectbox(
                "Employment Stability",
                ["Very Stable", "Stable", "Moderate", "Unstable"]
            )
            health_insurance = st.selectbox(
                "Health Insurance Coverage",
                ["Comprehensive", "Basic", "None"]
            )

        if st.button("Calculate Emergency Fund", use_container_width=True):
            # Calculate recommended months of expenses
            base_months = 3

            # Add months based on risk factors
            if employment_stability == "Unstable":
                base_months += 3
            elif employment_stability == "Moderate":
                base_months += 2
            elif employment_stability == "Stable":
                base_months += 1

            if health_insurance == "None":
                base_months += 2
            elif health_insurance == "Basic":
                base_months += 1

            base_months += min(dependents, 3)  # Add up to 3 months for dependents

            recommended_fund = monthly_expenses * base_months
            minimum_fund = monthly_expenses * 3
            maximum_fund = monthly_expenses * 12

            col1, col2, col3 = st.columns(3)
            with col1:
                st.metric(
                    "Recommended Fund",
                    f"₹{recommended_fund:,.2f}",
                    f"{base_months} months of expenses"
                )
            with col2:
                st.metric(
                    "Minimum Target",
                    f"₹{minimum_fund:,.2f}",
                    "3 months of expenses"
                )
            with col3:
                st.metric(
                    "Maximum Target",
                    f"₹{maximum_fund:,.2f}",
                    "12 months of expenses"
                )

            # Create visualization
            fund_levels = pd.DataFrame({
                'Level': ['Minimum', 'Recommended', 'Maximum'],
                'Amount': [minimum_fund, recommended_fund, maximum_fund],
                'Months': [3, base_months, 12]
            })

            fig = px.bar(
                fund_levels,
                x='Level',
                y='Amount',
                title='Emergency Fund Targets',
                text=fund_levels['Months'].apply(lambda x: f'{x} months'),
                labels={'Amount': 'Amount (₹)'}
            )
            st.plotly_chart(fig, use_container_width=True)

    elif calculator == "Home Down Payment 🏠":
        st.header("Home Down Payment Calculator")
        st.write("""
        Calculate how much you need to save for a home down payment and create a
        savings plan to reach your goal.
        """)
        st.warning("""
        **Disclaimer:** Home down payment calculations are estimates based on projected investment returns.  Actual returns may vary. This tool is for planning purposes only and does not constitute financial advice.
        """)

        col1, col2 = st.columns(2)
        with col1:
            property_value = st.number_input(
                "Expected Property Value (₹)",
                min_value=0,
                value=5000000,
                step=100000
            )
            down_payment_percent = st.slider(
                "Down Payment Percentage",
                min_value=10,
                max_value=40,
                value=20
            )

        with col2:
            years_to_purchase = st.number_input(
                "Years to Purchase",
                min_value=1,
                max_value=20,
                value=5
            )
            expected_return = st.number_input(
                "Expected Investment Return (%)",
                min_value=0.0,
                max_value=20.0,
                value=8.0,
                step=0.1
            )

        if st.button("Calculate Down Payment Plan", use_container_width=True):
            down_payment_amount = property_value * (down_payment_percent/100)
            monthly_savings = down_payment_amount / ((1 + expected_return/100)**years_to_purchase - 1) / (expected_return/100 * 12)

            col1, col2, col3 = st.columns(3)
            with col1:
                st.metric(
                    "Down Payment Required",
                    f"₹{down_payment_amount:,.2f}"
                )
            with col2:
                st.metric(
                    "Monthly Savings Needed",
                    f"₹{monthly_savings:,.2f}"
                )
            with col3:
                st.metric(
                    "Years to Goal",
                    f"{years_to_purchase} years"
                )

            # Show savings growth visualization
            years = list(range(years_to_purchase + 1))
            savings = []
            amount = 0

            for year in years:
                savings.append(amount)
                amount = (amount + monthly_savings * 12) * (1 + expected_return/100)

            df = pd.DataFrame({
                'Year': years,
                'Savings': savings
            })

            fig = px.line(
                df,
                x='Year',
                y='Savings',
                title='Down Payment Savings Growth',
                labels={'Savings': 'Amount (₹)'}
            )

            # Add target line
            fig.add_hline(
                y=down_payment_amount,
                line_dash="dash",
                line_color="red",
                annotation_text="Target Down Payment"
            )

            st.plotly_chart(fig, use_container_width=True)

    elif calculator == "Net Worth Tracker 💎":
        st.header("Net Worth Tracker")
        st.write("""
        Track your net worth by listing your assets and liabilities.
        This helps you understand your overall financial position and make better financial decisions.
        """)

        # Assets Section
        st.subheader("🏦 Assets")

        with st.expander("💡 Understanding Assets", expanded=True):
            st.info("""
            Assets are anything you own that has monetary value. They can be:
            - Liquid assets (easily converted to cash)
            - Fixed assets (long-term holdings)
            - Investment assets (potentially appreciating assets)
            """)

        col1, col2 = st.columns(2)

        with col1:
            cash = st.number_input("Cash and Bank Balances (₹)", min_value=0, value=0)
            investments = st.number_input("Investments (Stocks, Mutual Funds) (₹)", min_value=0, value=0)
            real_estate = st.number_input("Real Estate Value (₹)", min_value=0, value=0)

        with col2:
            vehicles = st.number_input("Vehicles Value (₹)", min_value=0, value=0)
            other_assets = st.number_input("Other Assets (₹)", min_value=0, value=0)

        total_assets = cash + investments + real_estate + vehicles + other_assets

        # Liabilities Section
        st.subheader("💫 Liabilities")

        with st.expander("💡 Understanding Liabilities", expanded=True):
            st.info("""
            Liabilities are your financial obligations or debts:
            - Short-term liabilities (credit cards, short-term loans)
            - Long-term liabilities (mortgages, long-term loans)
            - Recurring liabilities (regular payment obligations)
            """)

        col1, col2 = st.columns(2)

        with col1:
            home_loan = st.number_input("Home Loan Balance (₹)", min_value=0, value=0)
            car_loan = st.number_input("Car Loan Balance (₹)", min_value=0, value=0)

        with col2:
            credit_card = st.number_input("Credit Card Debt (₹)", min_value=0, value=0)
            other_loans = st.number_input("Other Loans (₹)", min_value=0, value=0)

        total_liabilities = home_loan + car_loan + credit_card + other_loans

        if st.button("Calculate Net Worth", use_container_width=True):
            net_worth = total_assets - total_liabilities

            # Display key metrics with detailed analysis
            st.subheader("📊 Financial Position Analysis")

            col1, col2, col3 = st.columns(3)
            with col1:
                st.metric(
                    "Total Assets",
                    f"₹{total_assets:,.2f}"
                )
            with col2:
                st.metric(
                    "Total Liabilities",
                    f"₹{total_liabilities:,.2f}"
                )
            with col3:
                st.metric(
                    "Net Worth",
                    f"₹{net_worth:,.2f}",
                    f"{'Positive' if net_worth >= 0 else 'Negative'} Net Worth"
                )

            # Show celebration for positive net worth
            if net_worth > 0:
                show_celebration_animation(
                    net_worth,
                    "🎉 Positive Net Worth! 🎉"
                )

            # Detailed Breakdown Analysis
            st.subheader("📈 Detailed Breakdown")

            # Assets breakdown
            assets_data = {
                'Category': ['Cash', 'Investments', 'Real Estate', 'Vehicles', 'Other'],
                'Amount': [cash, investments, real_estate, vehicles, other_assets],
                'Percentage': [x/total_assets*100 if total_assets > 0 else 0 for x in 
                             [cash, investments, real_estate, vehicles, other_assets]]
            }
            assets_df = pd.DataFrame(assets_data)

            # Liabilities breakdown
            liabilities_data = {
                'Category': ['Home Loan', 'Car Loan', 'Credit Card', 'Other Loans'],
                'Amount': [home_loan, car_loan, credit_card, other_loans],
                'Percentage': [x/total_liabilities*100 if total_liabilities > 0 else 0 for x in 
                             [home_loan, car_loan, credit_card, other_loans]]
            }
            liabilities_df = pd.DataFrame(liabilities_data)

            col1, col2 = st.columns(2)
            with col1:
                st.write("### Assets Distribution")
                st.dataframe(assets_df.style.format({
                    'Amount': '₹{:,.2f}',
                    'Percentage': '{:.1f}%'
                }))

                # Assets Pie Chart
                fig_assets = px.pie(
                    assets_df,
                    values='Amount',
                    names='Category',
                    title='Assets Distribution'
                )
                st.plotly_chart(fig_assets)

            with col2:
                st.write("### Liabilities Distribution")
                st.dataframe(liabilities_df.style.format({
                    'Amount': '₹{:,.2f}',
                    'Percentage': '{:.1f}%'
                }))

                # Liabilities Pie Chart
                fig_liabilities = px.pie(
                    liabilities_df,
                    values='Amount',
                    names='Category',
                    title='Liabilities Distribution'
                )
                st.plotly_chart(fig_liabilities)

            # Financial Health Indicators
            st.subheader("🏥 Financial Health Indicators")

            # Calculate key ratios
            debt_to_asset_ratio = total_liabilities/total_assets if total_assets > 0 else float('inf')
            liquid_assets = cash + investments
            liquid_ratio = liquid_assets/total_liabilities if total_liabilities > 0 else float('inf')

            # Display ratios and their interpretations
            col1, col2 = st.columns(2)
            with col1:
                st.metric(
                    "Debt to Asset Ratio",
                    f"{debt_to_asset_ratio:.2f}",
                    "Lower is better"
                )

                if debt_to_asset_ratio < 0.4:
                    st.success("✅ Healthy debt level")
                elif debt_to_asset_ratio < 0.6:
                    st.warning("⚠️ Moderate debt level")
                else:
                    st.error("🚨 High debt level")

            with col2:
                st.metric(
                    "Liquid Assets Ratio",
                    f"{liquid_ratio:.2f}",
                    "Higher is better"
                )

                if liquid_ratio > 1:
                    st.success("✅ Strong liquidity position")
                elif liquid_ratio > 0.5:
                    st.warning("⚠️ Moderate liquidity")
                else:
                    st.error("🚨 Low liquidity")

            # Recommendations based on analysis
            st.subheader("💡 Financial Recommendations")

            recommendations = []

            if debt_to_asset_ratio > 0.5:
                recommendations.append("Consider debt reduction strategies")
            if liquid_ratio < 1:
                recommendations.append("Build emergency fund and liquid assets")
            if credit_card > 0:
                recommendations.append("Prioritize paying off high-interest credit card debt")
            if total_assets > 0 and investments/total_assets < 0.2:
                recommendations.append("Consider increasing investment allocation")
            if net_worth < 0:
                recommendations.append("Focus on building positive net worth through savings and debt reduction")

            for rec in recommendations:
                st.warning(f"• {rec}")

            if not recommendations:
                st.success("✅ Your financial position looks healthy! Continue maintaining good financial habits.")

    elif calculator == "Investment Returns 📊":
        st.header("Investment Returns Calculator")
        st.write("""
        Calculate potential returns on your investments considering different
        scenarios and risk levels. This helps you make informed investment decisions.
        """)
        st.warning("""
        **Disclaimer:** Investment return calculations are projections based on assumed rates of return. Actual returns may vary significantly due to market conditions and other factors.  This calculator is for illustrative purposes only and should not be considered financial advice. Consult a financial advisor for personalized investment guidance.
        """)

        with st.expander("💡 Understanding Risk Levels", expanded=True):
            st.info("""
            **Risk Levels Explained:**
            1. **Conservative**: Lower risk, stable returns (6-8%)
               - Suitable for short-term goals
               - Focus on capital preservation
               - Mainly debt instruments
            
            2. **Moderate**: Balanced risk-return (8-12%)
               - Mix of equity and debt
               - Medium-term investment horizon
               - Moderate volatility
            
            3. **Aggressive**: Higher risk, potentially higher returns (12-15%)
               - Mainly equity focused
               - Long-term investment horizon
               - Higher volatility
            """)

        col1, col2 = st.columns(2)
        with col1:
            investment_amount = st.number_input(
                "Investment Amount (₹)",
                min_value=0,
                value=100000,
                step=1000
            )
            investment_period = st.number_input(
                "Investment Period (Years)",
                min_value=1,
                max_value=30,
                value=5
            )

        with col2:
            risk_level = st.selectbox(
                "Risk Level",
                ["Conservative", "Moderate", "Aggressive"]
            )

            # Set return ranges based on risk level
            if risk_level == "Conservative":
                return_range = (6.0, 8.0)
            elif risk_level == "Moderate":
                return_range = (8.0, 12.0)
            else:
                return_range = (12.0, 15.0)

            expected_return = st.slider(
                "Expected Annual Return (%)",
                min_value=float(return_range[0]),
                max_value=float(return_range[1]),
                value=float(return_range[0]),
                step=0.1
            )

        if st.button("Calculate Investment Returns", use_container_width=True):
            # Calculate returns for different scenarios
            conservative_return = investment_amount * (1 + return_range[0]/100)**investment_period
            expected_return_amount = investment_amount * (1 + expected_return/100)**investment_period
            aggressive_return = investment_amount * (1 + return_range[1]/100)**investment_period

            # Show key metrics
            st.subheader("📊 Investment Scenarios Analysis")

            col1, col2, col3 = st.columns(3)
            with col1:
                st.metric(
                    "Conservative Scenario",
                    f"₹{conservative_return:,.2f}",
                    f"{return_range[0]}% return"
                )
            with col2:
                st.metric(
                    "Expected Return",
                    f"₹{expected_return_amount:,.2f}",
                    f"{expected_return}% return"
                )
            with col3:
                st.metric(
                    "Aggressive Scenario",
                    f"₹{aggressive_return:,.2f}",
                    f"{return_range[1]}% return"
                )

            # Show celebration for good returns
            if expected_return_amount > investment_amount * 1.5:
                show_celebration_animation(
                    expected_return_amount - investment_amount,
                    "🎉 Excellent Growth Potential! 🎉"
                )

            # Detailed Scenario Analysis
            st.subheader("📈 Investment Growth Analysis")

            # Create visualization of growth scenarios
            years = list(range(investment_period + 1))
            conservative = [investment_amount * (1 + return_range[0]/100)**year for year in years]
            expected = [investment_amount * (1 + expected_return/100)**year for year in years]
            aggressive = [investment_amount * (1 + return_range[1]/100)**year for year in years]

            # Year-wise breakdown
            analysis_df = pd.DataFrame({
                'Year': years,
                'Conservative': conservative,
                'Expected': expected,
                'Aggressive': aggressive,
                'Conservative Returns': [x - investment_amount for x in conservative],
                'Expected Returns': [x - investment_amount for x in expected],
                'Aggressive Returns': [x - investment_amount for x in aggressive]
            })

            st.dataframe(analysis_df.style.format({
                'Conservative': '₹{:,.2f}',
                'Expected': '₹{:,.2f}',
                'Aggressive': '₹{:,.2f}',
                'Conservative Returns': '₹{:,.2f}',
                'Expected Returns': '₹{:,.2f}',
                'Aggressive Returns': '₹{:,.2f}'
            }))

            # Growth visualization
            df = pd.DataFrame({
                'Year': years * 3,
                'Amount': conservative + expected + aggressive,
                'Scenario': ['Conservative'] * len(years) + ['Expected'] * len(years) + ['Aggressive'] * len(years)
            })

            fig = px.line(
                df,
                x='Year',
                y='Amount',
                color='Scenario',
                title='Investment Growth Scenarios',
                labels={'Amount': 'Amount (₹)'}
            )
            st.plotly_chart(fig, use_container_width=True)

            # Risk Analysis
            st.subheader("🎯 Risk-Return Analysis")

            # Calculate key metrics
            total_return_percent = (expected_return_amount/investment_amount - 1) * 100
            annual_return = (1 + total_return_percent/100)**(1/investment_period) - 1
            risk_level_str = "Low" if risk_level == "Conservative" else "Medium" if risk_level == "Moderate" else "High"

            col1, col2 = st.columns(2)
            with col1:
                st.info(f"""
                ### 📊 Return Metrics
                - Total Return: {total_return_percent:.1f}%
                - Annual Return: {annual_return*100:.1f}%
                - Investment Horizon: {investment_period} years
                - Risk Level: {risk_level_str}
                """)

            with col2:
                st.info(f"""
                ### 💡 Portfolio Characteristics
                - Investment Style: {risk_level}
                - Return Range: {return_range[0]}% - {return_range[1]}%
                - Capital Growth: ₹{expected_return_amount - investment_amount:,.2f}
                - Risk Category: {risk_level_str}
                """)

            # Investment Recommendations
            st.subheader("💡 Investment Recommendations")

            if investment_period < 3:
                st.warning("""
                **Short-term Investment Strategy:**
                - Consider more conservative allocation
                - Focus on capital preservation
                - Review investment horizon
                - Consider fixed income options
                """)
            elif investment_period < 7:
                st.info("""
                **Medium-term Investment Strategy:**
                - Balance between growth and stability
                - Regular portfolio rebalancing
                - Consider increasing equity exposure
                - Monitor market conditions
                """)
            else:
                st.success("""
                **Long-term Investment Strategy:**
                - Focus on equity for growth
                - Use rupee cost averaging
                - Regular portfolio review
                - Stay invested through market cycles
                """)

    elif calculator == "Stock Average Calculator 📈":
        show_stock_average_calculator()
        
    elif calculator == "CAGR Calculator 📊":
        show_cagr_calculator()
        
    elif calculator == "Interest Rate Calculator 📊":
        show_interest_rate_calculator()
        
    elif calculator == "Inflation Calculator 💸":
        show_inflation_calculator()
        
    elif calculator == "Discount Calculator 💰":
        show_discount_calculator()
        
    elif calculator == "GST Calculator 🧾":
        show_gst_calculator()
        
    elif calculator == "Gratuity Calculator 💼":
        from utils.calculators import show_gratuity_calculator
        show_gratuity_calculator()
        return
    elif calculator == "Loan EMI 💳":
        st.header("Loan EMI Calculator")
        st.write("""
        Calculate your loan EMI and understand the total cost of borrowing
        including interest payments.  This calculator provides a detailed breakdown of your loan repayment schedule, allowing you to visualize the impact of interest payments over time.  It also offers insights into the total cost of borrowing, helping you make informed financial decisions about your loan.
        """)
        st.warning("""
        **Disclaimer:** Loan EMI calculations are based on a fixed interest rate.  Actual EMI amounts may vary based on lender policies and other factors. This calculator is for illustrative purposes only and should not be considered financial advice. Consult a financial advisor for personalized loan guidance.
        """)

        col1, col2 = st.columns(2)
        with col1:
            loan_amount = st.number_input(
                "Loan Amount (₹)",
                min_value=0,
                value=1000000,
                step=10000
            )
            interest_rate = st.number_input(
                "Annual Interest Rate (%)",
                min_value=0.0,
                max_value=30.0,
                value=10.0,
                step=0.1
            )

        with col2:
            loan_tenure = st.number_input(
                "Loan Tenure (Years)",
                min_value=1,
                max_value=30,
                value=20
            )

        if st.button("Calculate EMI", use_container_width=True):
            # Calculate EMI
            monthly_rate = interest_rate/(12*100)
            tenure_months = loan_tenure * 12

            emi = loan_amount * monthly_rate * (1 + monthly_rate)**tenure_months / ((1 + monthly_rate)**tenure_months - 1)
            total_payment = emi * tenure_months
            total_interest = total_payment - loan_amount

            col1, col2, col3 = st.columns(3)
            with col1:
                st.metric(
                    "Monthly EMI",
                    f"₹{emi:,.2f}"
                )
            with col2:
                st.metric(
                    "Total Interest",
                    f"₹{total_interest:,.2f}"
                )
            with col3:
                st.metric(
                    "Total Payment",
                    f"₹{total_payment:,.2f}"
                )

            # Create amortization schedule
            remaining_loan = loan_amount
            interest_paid = 0
            principal_paid = 0

            years = list(range(loan_tenure + 1))
            loan_balance = []
            interest_component = []
            principal_component = []

            for year in years:
                loan_balance.append(remaining_loan)
                if year > 0:
                    year_interest = remaining_loan * interest_rate/100
                    year_principal = emi * 12 - year_interest

                    interest_component.append(year_interest)
                    principal_component.append(year_principal)

                    remaining_loan -= year_principal
                else:
                    interest_component.append(0)
                    principal_component.append(0)

            #Detailed Cost Breakdown
            st.subheader("📊 Detailed Cost Breakdown")
            cost_breakdown = pd.DataFrame({
                'Year': years,
                'Loan Balance': loan_balance,
                'Interest Paid': interest_component,
                'Principal Paid': principal_component
            })
            st.dataframe(cost_breakdown.style.format({
                'Loan Balance': '₹{:,.2f}',
                'Interest Paid': '₹{:,.2f}',
                'Principal Paid': '₹{:,.2f}'
            }))

            # Create visualization
            fig = px.area(
                data_frame=pd.DataFrame({
                    'Year': years * 3,
                    'Amount': loan_balance + interest_component + principal_component,
                    'Type': ['Remaining Loan'] * len(years) + 
                           ['Interest'] * len(years) + 
                           ['Principal'] * len(years)
                }),
                x='Year',
                y='Amount',
                color='Type',
                title='Loan Amortization Schedule',
                labels={'Amount': 'Amount (₹)'},
                # Remove 'names' parameter as it's causing an error
            )
            st.plotly_chart(fig, use_container_width=True)

def calculate_retirement_needs(current_age, retirement_age, life_expectancy, 
                             monthly_expenses, inflation_rate, return_rate):
    """Calculate retirement needs and required monthly savings"""
    years_to_retirement = retirement_age - current_age
    retirement_duration = life_expectancy - retirement_age
    inflation_rate = inflation_rate / 100
    return_rate = return_rate / 100

    # Calculate future monthly expenses
    future_monthly_expenses = monthly_expenses * (1 + inflation_rate)**years_to_retirement
    total_needed = future_monthly_expenses * 12 * retirement_duration

    # Calculate required monthly savings
    monthly_payment = total_needed / ((1 + return_rate)**(years_to_retirement) - 1) / (return_rate * 12)

    return total_needed, monthly_payment

# Stock Average Calculator
def show_stock_average_calculator():
    st.header("Stock Average Calculator")
    st.write("""
    Calculate your average purchase price when buying additional shares of a stock.
    This helps you track your investment cost basis and make informed decisions.
    """)
    
    # Initialize session state for holding stock entries
    if 'stock_holdings' not in st.session_state:
        st.session_state.stock_holdings = []
    
    # Input for existing holdings
    st.subheader("Current Holdings")
    
    if len(st.session_state.stock_holdings) > 0:
        holdings_df = pd.DataFrame(st.session_state.stock_holdings)
        holdings_df["total_value"] = holdings_df["price"] * holdings_df["quantity"]
        
        st.dataframe(
            holdings_df.style.format({
                "price": "₹{:,.2f}",
                "quantity": "{:,}",
                "total_value": "₹{:,.2f}"
            })
        )
        
        # Calculate current average
        total_quantity = holdings_df["quantity"].sum()
        total_investment = holdings_df["total_value"].sum()
        current_average = total_investment / total_quantity if total_quantity > 0 else 0
        
        st.metric(
            "Current Average Price",
            f"₹{current_average:,.2f}"
        )
        
        if st.button("Reset Holdings", key="reset_holdings"):
            st.session_state.stock_holdings = []
            st.rerun()
    else:
        st.info("No existing holdings. Add your first purchase below.")
    
    # Form for adding new holdings
    with st.expander("Add Existing Purchase", expanded=len(st.session_state.stock_holdings) == 0):
        with st.form("add_holding_form"):
            col1, col2 = st.columns(2)
            with col1:
                purchase_price = st.number_input(
                    "Purchase Price per Share (₹)",
                    min_value=0.01,
                    value=100.0,
                    step=0.01,
                    key="existing_price"
                )
            with col2:
                purchase_quantity = st.number_input(
                    "Number of Shares",
                    min_value=1,
                    value=10,
                    step=1,
                    key="existing_quantity"
                )
            
            purchase_date = st.date_input(
                "Purchase Date",
                value=None,
                key="existing_date"
            )
            
            submit_button = st.form_submit_button("Add to Holdings", use_container_width=True)
            
            if submit_button:
                st.session_state.stock_holdings.append({
                    "price": purchase_price,
                    "quantity": purchase_quantity,
                    "date": purchase_date.strftime("%Y-%m-%d") if purchase_date else None
                })
                st.rerun()
    
    # New purchase calculation
    st.subheader("New Purchase")
    st.write("Enter details of the new shares you plan to purchase")
    
    col1, col2 = st.columns(2)
    with col1:
        new_price = st.number_input(
            "New Purchase Price per Share (₹)",
            min_value=0.01,
            value=90.0,
            step=0.01
        )
    with col2:
        new_quantity = st.number_input(
            "Number of New Shares",
            min_value=1,
            value=5,
            step=1
        )
    
    if st.button("Calculate New Average", use_container_width=True):
        # Calculate new average
        if len(st.session_state.stock_holdings) > 0:
            holdings_df = pd.DataFrame(st.session_state.stock_holdings)
            previous_qty = holdings_df["quantity"].sum()
            previous_value = (holdings_df["price"] * holdings_df["quantity"]).sum()
            previous_avg = previous_value / previous_qty if previous_qty > 0 else 0
            
            # Calculate new values
            total_qty = previous_qty + new_quantity
            total_inv = previous_value + (new_price * new_quantity)
            avg_price = total_inv / total_qty
            
            # Calculate change
            price_change = avg_price - previous_avg
            pct_change = (price_change / previous_avg) * 100 if previous_avg > 0 else 0
        else:
            # First purchase
            avg_price = new_price
            total_qty = new_quantity
            total_inv = new_price * new_quantity
            price_change = 0
            pct_change = 0
        
        # Display results
        st.subheader("📊 New Average Calculation")
        
        col1, col2, col3 = st.columns(3)
        with col1:
            st.metric(
                "New Average Price",
                f"₹{avg_price:,.2f}",
                f"{price_change:,.2f} ({pct_change:.2f}%)" if price_change != 0 else None,
                delta_color="inverse"  # Lower average is better
            )
        with col2:
            st.metric(
                "Total Shares",
                f"{total_qty:,}",
                f"+{new_quantity:,}"
            )
        with col3:
            st.metric(
                "Total Investment",
                f"₹{total_inv:,.2f}",
                f"+₹{new_price * new_quantity:,.2f}"
            )
        
        # Visualization of impact
        if len(st.session_state.stock_holdings) > 0:
            st.subheader("Purchase History Impact")
            
            # Prepare data for visualization
            history = st.session_state.stock_holdings.copy()
            history.append({
                "price": new_price,
                "quantity": new_quantity,
                "date": "New Purchase"
            })
            
            # Calculate running average
            running_qty = 0
            running_value = 0
            running_avg = []
            
            for i, entry in enumerate(history):
                running_qty += entry["quantity"]
                running_value += entry["price"] * entry["quantity"]
                running_avg.append({
                    "purchase": i + 1,
                    "price": entry["price"],
                    "average": running_value / running_qty
                })
            
            # Create dataframe for visualization
            avg_df = pd.DataFrame(running_avg)
            
            # Plot
            fig = px.line(
                avg_df,
                x="purchase",
                y=["price", "average"],
                title="Purchase Prices and Running Average",
                labels={"value": "Price (₹)", "variable": "Type"},
                color_discrete_map={
                    "price": "#EF553B",
                    "average": "#00CC96"
                }
            )
            st.plotly_chart(fig, use_container_width=True)
        
        # Add new purchase to holdings option
        if st.button("Add This Purchase to Holdings"):
            st.session_state.stock_holdings.append({
                "price": new_price,
                "quantity": new_quantity,
                "date": date.today().strftime("%Y-%m-%d")
            })
            st.success("New purchase added to your holdings!")
            st.rerun()
        
        # Investment insights
        st.subheader("💡 Investment Insights")
        
        # Dollar-cost averaging analysis
        if len(st.session_state.stock_holdings) > 0:
            highest_price = max([h["price"] for h in st.session_state.stock_holdings] + [new_price])
            lowest_price = min([h["price"] for h in st.session_state.stock_holdings] + [new_price])
            price_range_pct = ((highest_price - lowest_price) / lowest_price) * 100
            
            st.info(f"""
            **Dollar-Cost Averaging Analysis:**
            - Price range of your purchases: ₹{lowest_price:,.2f} to ₹{highest_price:,.2f} ({price_range_pct:.2f}% variation)
            - By buying at different price points, you've averaged out market volatility
            - This strategy helps reduce timing risk in volatile markets
            """)
        
        # Strategy recommendations based on new price vs. average
        if price_change < 0:
            st.success(f"""
            **Averaging Down:** Your new purchase is at a lower price (₹{new_price:,.2f}) than your previous average (₹{(avg_price - price_change):,.2f})
            - This reduces your average cost basis by ₹{-price_change:,.2f} per share
            - If you believe in the long-term value, this can be a good strategy
            - Consider the reasons for the price decline to ensure your investment thesis remains valid
            """)
        elif price_change > 0:
            st.warning(f"""
            **Averaging Up:** Your new purchase is at a higher price (₹{new_price:,.2f}) than your previous average (₹{(avg_price - price_change):,.2f})
            - This increases your average cost basis by ₹{price_change:,.2f} per share
            - This can be a good strategy if it's a performing stock with continued growth potential
            - Ensure your conviction in the stock has increased to justify buying at higher prices
            """)
        
        # Tax implications (for Indian investors)
        st.write("""
        **Tax Considerations:**
        - Short-term capital gains (held < 1 year) are taxed at your income tax slab rate
        - Long-term capital gains (held > 1 year) are taxed at 10% for gains above ₹1 lakh
        - Each purchase lot is tracked separately for tax calculation using FIFO (First In, First Out) method
        *Note: Tax rules may change. Consult a tax professional for personalized advice.*
        """)

# Home Loan EMI Calculator
def show_home_loan_calculator():
    """Show the home loan calculator interface with Indian housing loan specifics"""
    st.header("Home Loan EMI Calculator")
    st.write("""
    Calculate your home loan EMI and understand the total cost of borrowing including interest payments.
    This calculator provides a detailed breakdown of your home loan repayment schedule, allowing you to 
    visualize the impact of interest payments over time. It also offers insights into the total cost of 
    borrowing, helping you make informed financial decisions about your home loan.
    """)
    
    st.warning("""
    **Disclaimer:** Home Loan EMI calculations are based on a fixed interest rate. Actual EMI amounts 
    may vary based on lender policies and other factors. This calculator is for illustrative purposes 
    only and should not be considered financial advice. Consult a financial advisor for personalized 
    home loan guidance.
    """)
    
    col1, col2 = st.columns(2)
    with col1:
        loan_amount = st.number_input(
            "Loan Amount (₹)",
            min_value=100000,
            max_value=50000000,
            value=3000000,
            step=100000,
            help="The principal loan amount you want to borrow"
        )
        
        interest_rate = st.number_input(
            "Interest Rate (% p.a.)",
            min_value=5.0,
            max_value=15.0,
            value=8.5,
            step=0.1,
            help="Annual interest rate offered by the lender"
        )
    
    with col2:
        tenure_years = st.number_input(
            "Loan Tenure (Years)",
            min_value=1,
            max_value=30,
            value=20,
            step=1,
            help="Total duration of the loan in years"
        )
        
        prepayment_frequency = st.radio(
            "Prepayment Frequency",
            options=["None", "Monthly", "Annual", "Custom Schedule"],
            index=0,
            horizontal=True,
            help="Choose how often you want to make prepayments"
        )
        
        if prepayment_frequency == "Monthly":
            monthly_prepayment = st.number_input(
                "Monthly Prepayment (₹)",
                min_value=0,
                max_value=500000,
                value=10000,
                step=1000,
                help="Additional amount you plan to pay monthly to reduce principal faster"
            )
            prepayment_amount = 0  # Will handle monthly prepayment separately
        elif prepayment_frequency == "Annual":
            prepayment_amount = st.number_input(
                "Annual Prepayment (₹)",
                min_value=0,
                max_value=5000000,
                value=100000,
                step=10000,
                help="Additional amount you plan to pay annually to reduce principal faster"
            )
            monthly_prepayment = 0
        elif prepayment_frequency == "Custom Schedule":
            st.info("You'll be able to add custom prepayments in the detailed schedule after calculation")
            prepayment_amount = 0
            monthly_prepayment = 0
        else:
            prepayment_amount = 0
            monthly_prepayment = 0
    
    # Convert years to months
    tenure_months = tenure_years * 12
    
    # Tax benefits section
    with st.expander("🏛️ Income Tax Benefits"):
        st.write("""
        ### Available Income Tax Benefits:
        
        **Section 24(b):** Interest paid on housing loan (up to ₹2,00,000 per year)
        
        **Section 80C:** Principal repayment (up to ₹1,50,000 per year along with other eligible investments)
        
        **Section 80EE:** Additional interest deduction for first-time homebuyers (up to ₹50,000 per year)
        
        **Section 80EEA:** Additional interest deduction for affordable housing (up to ₹1,50,000 per year)
        """)
        
        tax_slab = st.selectbox(
            "Income Tax Slab",
            options=[
                "Old Regime - 5%", 
                "Old Regime - 20%", 
                "Old Regime - 30%",
                "New Regime - 5%",
                "New Regime - 10%",
                "New Regime - 15%",
                "New Regime - 20%",
                "New Regime - 30%"
            ],
            index=2
        )
        
        first_time_buyer = st.checkbox(
            "First-time Home Buyer",
            value=True,
            help="Check this if this is your first home purchase"
        )
        
        affordable_housing = st.checkbox(
            "Affordable Housing (Property value ≤ ₹45 lakhs)",
            value=False,
            help="Check if your property qualifies as affordable housing"
        )
    
    if st.button("Calculate EMI", use_container_width=True):
        # Calculate EMI
        monthly_rate = interest_rate / 12 / 100
        emi = loan_amount * monthly_rate * (1 + monthly_rate) ** tenure_months / ((1 + monthly_rate) ** tenure_months - 1)
        
        # Calculate amortization schedule
        remaining_principal = loan_amount
        total_interest = 0
        yearly_principal = []
        yearly_interest = []
        yearly_remaining = []
        yearly_labels = []
        
        # Calculate values with prepayment
        has_prepayment = prepayment_amount > 0 or monthly_prepayment > 0 or prepayment_frequency == "Custom Schedule"
        prepayment_schedule = []
        monthly_prepayment_schedule = []
        actual_tenure_months = tenure_months
        monthly_details = []
        
        # Create a custom prepayment schedule if selected
        custom_prepayments = {}
        
        # Initialize monthly data tracking
        for year in range(1, tenure_years + 1):
            year_start_principal = remaining_principal
            yearly_principal_paid = 0
            yearly_interest_paid = 0
            
            for month in range(1, 13):
                month_count = (year - 1) * 12 + month
                if remaining_principal <= 0:
                    # Add empty rows to complete the table
                    monthly_details.append({
                        "Month": month_count,
                        "Year": year,
                        "Month_in_Year": month,
                        "EMI": 0,
                        "Principal": 0,
                        "Interest": 0,
                        "Prepayment": 0,
                        "Balance": 0
                    })
                    continue
                    
                interest_part = remaining_principal * monthly_rate
                principal_part = min(emi - interest_part, remaining_principal)
                
                # Track the pre-prepayment values
                current_emi = emi
                current_principal = principal_part
                current_prepayment = 0
                
                # Apply monthly prepayment if selected
                if prepayment_frequency == "Monthly" and monthly_prepayment > 0 and remaining_principal > 0:
                    current_prepayment = min(monthly_prepayment, remaining_principal - principal_part)
                    if current_prepayment > 0:
                        remaining_principal -= current_prepayment
                        monthly_prepayment_schedule.append(current_prepayment)
                
                # Apply custom prepayment if in the schedule
                if prepayment_frequency == "Custom Schedule" and str(month_count) in custom_prepayments:
                    custom_prepay = min(custom_prepayments[str(month_count)], remaining_principal - principal_part)
                    if custom_prepay > 0:
                        remaining_principal -= custom_prepay
                        current_prepayment += custom_prepay
                
                # Reduce principal by regular payment
                remaining_principal -= principal_part
                
                yearly_principal_paid += principal_part + current_prepayment
                yearly_interest_paid += interest_part
                total_interest += interest_part
                
                # Track detailed monthly data
                monthly_details.append({
                    "Month": month_count,
                    "Year": year,
                    "Month_in_Year": month,
                    "EMI": current_emi,
                    "Principal": principal_part,
                    "Interest": interest_part,
                    "Prepayment": current_prepayment,
                    "Balance": remaining_principal
                })
                
                # Apply annual prepayment at the end of each year
                if month == 12 and prepayment_frequency == "Annual" and prepayment_amount > 0 and remaining_principal > 0:
                    prepay = min(prepayment_amount, remaining_principal)
                    remaining_principal -= prepay
                    yearly_principal_paid += prepay
                    prepayment_schedule.append(prepay)
                    
                    # Update the last entry in monthly_details to reflect this
                    monthly_details[-1]["Prepayment"] += prepay
                    monthly_details[-1]["Balance"] = remaining_principal
                
                # If loan paid off early, update actual tenure
                if remaining_principal <= 0:
                    actual_tenure_months = month_count
            
            yearly_principal.append(yearly_principal_paid)
            yearly_interest.append(yearly_interest_paid)
            yearly_remaining.append(remaining_principal)
            yearly_labels.append(f"Year {year}")
        
        total_payment = loan_amount + total_interest
        if has_prepayment:
            total_annual_prepaid = sum(prepayment_schedule) if prepayment_schedule else 0
            total_monthly_prepaid = sum(monthly_prepayment_schedule) if monthly_prepayment_schedule else 0
            
            # Total from custom prepayments if applicable
            total_custom_prepaid = 0
            if prepayment_frequency == "Custom Schedule" and custom_prepayments:
                total_custom_prepaid = sum(custom_prepayments.values())
                
            total_prepaid = total_annual_prepaid + total_monthly_prepaid + total_custom_prepaid
            loan_amount_with_prepay = loan_amount - total_prepaid
            interest_saved = tenure_months * emi - (actual_tenure_months * emi + total_prepaid)
        
        # Calculate tax benefits
        tax_rate = int(tax_slab.split(" - ")[1].replace("%", "")) / 100
        yearly_interest_deduction = min(yearly_interest[0], 200000)  # Section 24(b)
        yearly_principal_deduction = min(yearly_principal[0], 150000)  # Section 80C
        
        additional_interest_deduction = 0
        if first_time_buyer:
            additional_interest_deduction += min(yearly_interest[0] - yearly_interest_deduction, 50000)  # Section 80EE
        
        if affordable_housing:
            additional_interest_deduction += min(yearly_interest[0] - yearly_interest_deduction, 150000)  # Section 80EEA
        
        total_tax_benefit = (yearly_interest_deduction + yearly_principal_deduction + additional_interest_deduction) * tax_rate
        
        # Display results
        st.subheader("📊 Loan Summary")
        
        col1, col2, col3 = st.columns(3)
        with col1:
            st.metric(
                "Monthly EMI",
                f"₹{emi:,.2f}"
            )
        with col2:
            st.metric(
                "Total Interest",
                f"₹{total_interest:,.2f}"
            )
        with col3:
            st.metric(
                "Total Payment",
                f"₹{total_payment:,.2f}"
            )
        
        # Show EMI breakdown in a pie chart
        st.subheader("EMI Composition")
        fig = go.Figure(
            data=[
                go.Pie(
                    labels=["Principal", "Interest"],
                    values=[loan_amount, total_interest],
                    hole=0.4,
                    marker=dict(colors=["#2E86C1", "#E74C3C"]),
                )
            ]
        )
        fig.update_layout(title_text="Principal vs Interest")
        st.plotly_chart(fig, use_container_width=True)
        
        # Display amortization chart
        st.subheader("Year-wise Amortization")
        
        amortization_df = pd.DataFrame({
            "Year": yearly_labels,
            "Principal Paid": yearly_principal,
            "Interest Paid": yearly_interest,
            "Remaining Principal": yearly_remaining
        })
        
        # Create a stacked bar chart for principal and interest
        fig1 = px.bar(
            amortization_df,
            x="Year",
            y=["Principal Paid", "Interest Paid"],
            title="Yearly Payment Breakdown",
            labels={"value": "Amount (₹)", "variable": "Payment Type"}
        )
        st.plotly_chart(fig1, use_container_width=True)
        
        # Create a line chart for remaining principal
        fig2 = px.line(
            amortization_df,
            x="Year",
            y="Remaining Principal",
            title="Outstanding Principal Over Time",
            labels={"Remaining Principal": "Amount (₹)"}
        )
        st.plotly_chart(fig2, use_container_width=True)
        
        # Show detailed amortization schedule
        st.subheader("Year-wise Amortization Schedule")
        st.dataframe(
            amortization_df.style.format({
                "Principal Paid": "₹{:,.2f}",
                "Interest Paid": "₹{:,.2f}",
                "Remaining Principal": "₹{:,.2f}",
            })
        )
        
        # Convert monthly details to DataFrame
        monthly_df = pd.DataFrame(monthly_details)
        
        # Show month-by-month details
        with st.expander("📅 Detailed Month-by-Month Schedule"):
            if prepayment_frequency == "Custom Schedule":
                st.subheader("✏️ Monthly Prepayment Schedule")
                
                st.info("""
                Enter prepayment amounts for each month. You can modify the values for any month you plan to make prepayments.
                After setting your prepayment schedule, click 'Recalculate with Custom Prepayments' to see the impact.
                """)
                
                # Initialize the custom prepayments structure in session state
                if "custom_prepayments" not in st.session_state:
                    st.session_state.custom_prepayments = {}
                
                # Create monthly prepayment schedule as a table
                prepay_table_data = []
                
                # Calculate number of years to display (limit to actual tenure or specified tenure)
                display_years = min(tenure_years, 10)  # Show first 10 years by default
                
                for year in range(1, display_years + 1):
                    for month in range(1, 13):
                        month_num = (year - 1) * 12 + month
                        if month_num <= tenure_months:
                            month_key = str(month_num)
                            # Get existing prepayment amount or default to 0
                            prepay_amount = st.session_state.custom_prepayments.get(month_key, 0)
                            prepay_table_data.append({
                                "Month Number": month_num,
                                "Year": year,
                                "Month": month,
                                "Prepayment Amount": prepay_amount
                            })
                
                prepay_df = pd.DataFrame(prepay_table_data)
                
                # Create an editable table layout with 4 months per row
                months_per_row = 4
                rows_needed = (len(prepay_table_data) + months_per_row - 1) // months_per_row
                
                st.write("### Monthly Prepayment Schedule (First 10 Years)")
                
                for row in range(rows_needed):
                    cols = st.columns(months_per_row)
                    for col_idx in range(months_per_row):
                        idx = row * months_per_row + col_idx
                        if idx < len(prepay_table_data):
                            month_data = prepay_table_data[idx]
                            month_key = str(month_data["Month Number"])
                            with cols[col_idx]:
                                st.write(f"Month {month_data['Month Number']}")
                                amount = st.number_input(
                                    f"Month {month_data['Month Number']} Prepayment",
                                    min_value=0,
                                    max_value=1000000,
                                    value=int(month_data["Prepayment Amount"]),
                                    step=5000,
                                    key=f"prepay_{month_data['Month Number']}",
                                    label_visibility="collapsed"
                                )
                                
                                # Store the value in session state if it's not zero
                                if amount > 0:
                                    st.session_state.custom_prepayments[month_key] = amount
                                elif month_key in st.session_state.custom_prepayments and amount == 0:
                                    # Remove zero values to save space
                                    del st.session_state.custom_prepayments[month_key]
                
                # Quick set buttons
                st.subheader("Quick Set Options")
                col1, col2, col3 = st.columns(3)
                
                with col1:
                    if st.button("Clear All Prepayments"):
                        st.session_state.custom_prepayments = {}
                        st.rerun()
                
                with col2:
                    if st.button("Set Year-End Prepayments"):
                        # Add 50,000 prepayment to December of each year
                        for year in range(1, display_years + 1):
                            month_num = year * 12
                            st.session_state.custom_prepayments[str(month_num)] = 50000
                        st.rerun()
                
                with col3:
                    if st.button("Set Bonus Months (Apr, Nov)"):
                        # Add prepayments to April and November (typical bonus months)
                        for year in range(1, display_years + 1):
                            april = (year - 1) * 12 + 4
                            november = (year - 1) * 12 + 11
                            st.session_state.custom_prepayments[str(april)] = 30000
                            st.session_state.custom_prepayments[str(november)] = 50000
                        st.rerun()
                
                # Show summary of scheduled prepayments
                if st.session_state.custom_prepayments:
                    st.subheader("Prepayment Summary")
                    total_prepayment = sum(st.session_state.custom_prepayments.values())
                    num_months_with_prepayment = len(st.session_state.custom_prepayments)
                    
                    summary_col1, summary_col2 = st.columns(2)
                    with summary_col1:
                        st.metric("Total Scheduled Prepayments", f"₹{total_prepayment:,.2f}")
                    with summary_col2:
                        st.metric("Months with Prepayments", f"{num_months_with_prepayment}")
                    
                    if st.button("Recalculate with Custom Prepayments", type="primary", use_container_width=True):
                        # Pass the custom prepayment schedule to calculation
                        custom_prepayments = st.session_state.custom_prepayments
                        # This will restart the calculation with the custom schedule
                        st.rerun()
            
            # Show the month-by-month schedule
            st.subheader("Monthly Amortization Schedule")
            
            # Format the monthly DataFrame
            if not monthly_df.empty:
                formatted_monthly_df = monthly_df.copy()
                formatted_monthly_df = formatted_monthly_df[formatted_monthly_df["EMI"] > 0]  # Filter out empty rows
                
                # Format columns
                st.dataframe(
                    formatted_monthly_df.style.format({
                        "EMI": "₹{:,.2f}",
                        "Principal": "₹{:,.2f}",
                        "Interest": "₹{:,.2f}",
                        "Prepayment": "₹{:,.2f}",
                        "Balance": "₹{:,.2f}"
                    })
                )
        
        # Prepayment analysis
        if has_prepayment:
            st.subheader("💰 Prepayment Benefits")
            time_saved = tenure_months - actual_tenure_months
            
            prepay_col1, prepay_col2, prepay_col3 = st.columns(3)
            with prepay_col1:
                st.metric(
                    "Time Saved",
                    f"{time_saved//12} Years, {time_saved%12} Months",
                    help="Time saved due to prepayments"
                )
            with prepay_col2:
                st.metric(
                    "Interest Saved",
                    f"₹{interest_saved:,.2f}",
                    f"{interest_saved/total_interest*100:.1f}%",
                    help="Interest amount saved due to prepayments"
                )
            with prepay_col3:
                st.metric(
                    "Total Prepaid Amount",
                    f"₹{total_prepaid:,.2f}",
                    help="Sum of all prepayments"
                )
            
            # Calculate regular payment scenario (no prepayments)
            regular_interest = total_interest + interest_saved
            regular_payment = loan_amount + regular_interest
            
            # Create simpler comparison charts
            st.subheader("📊 With vs. Without Prepayment Comparison")
            
            # Create data for comparison
            comparison_data = {
                "Category": ["Years to Repay", "Interest Paid (Lakhs)"],
                "Without Prepayment": [tenure_years, regular_interest/100000],
                "With Prepayment": [(actual_tenure_months/12), total_interest/100000]
            }
            comparison_df = pd.DataFrame(comparison_data)
            
            # Set up the two side-by-side charts
            col1, col2 = st.columns(2)
            
            with col1:
                # Years to repay comparison
                fig = go.Figure()
                fig.add_trace(go.Bar(
                    x=["Without Prepayment", "With Prepayment"],
                    y=[tenure_years, actual_tenure_months/12],
                    text=[f"{tenure_years} years", f"{actual_tenure_months//12} years, {actual_tenure_months%12} months"],
                    textposition="auto",
                    marker_color=["#E74C3C", "#2ECC71"]
                ))
                fig.update_layout(
                    title="Years to Repay Loan",
                    yaxis_title="Years",
                    showlegend=False
                )
                
                # Add an annotation for time saved
                if time_saved > 0:
                    fig.add_annotation(
                        x=1.1,  # Position closer to the second bar
                        y=actual_tenure_months/12 * 1.2,  # Position above the second bar
                        text=f"<b>Time Saved:</b><br><b>{time_saved//12}y {time_saved%12}m</b>",
                        showarrow=True,
                        arrowhead=2,
                        arrowsize=1,
                        arrowwidth=2,
                        ax=0,  # Horizontal offset
                        ay=-40,  # Vertical offset (negative moves arrow up)
                        bgcolor="rgba(46, 204, 113, 0.8)",
                        bordercolor="#27ae60",
                        borderwidth=2,
                        font=dict(
                            size=16,
                            color="white",
                            family="Trebuchet MS, sans-serif"
                        )
                    )
                
                st.plotly_chart(fig, use_container_width=True)
            
            with col2:
                # Interest paid comparison
                fig = go.Figure()
                fig.add_trace(go.Bar(
                    x=["Without Prepayment", "With Prepayment"],
                    y=[regular_interest, total_interest],
                    text=[f"₹{regular_interest/100000:.1f} lakhs", f"₹{total_interest/100000:.1f} lakhs"],
                    textposition="auto",
                    marker_color=["#E74C3C", "#2ECC71"]
                ))
                fig.update_layout(
                    title="Interest Paid",
                    yaxis_title="Amount (₹)",
                    showlegend=False
                )
                
                # Add an annotation for interest saved
                if interest_saved > 0:
                    fig.add_annotation(
                        x=1.1,  # Position closer to the second bar
                        y=total_interest * 1.2,  # Position above the second bar
                        text=f"<b>Interest Saved:</b><br><b>₹{interest_saved/100000:.1f} lakhs</b>",
                        showarrow=True,
                        arrowhead=2,
                        arrowsize=1,
                        arrowwidth=2,
                        ax=0,  # Horizontal offset
                        ay=-40,  # Vertical offset (negative moves arrow up)
                        bgcolor="rgba(46, 204, 113, 0.8)",
                        bordercolor="#27ae60",
                        borderwidth=2,
                        font=dict(
                            size=16,
                            color="white",
                            family="Trebuchet MS, sans-serif"
                        )
                    )
                
                # Format the Y-axis to show in lakhs
                fig.update_layout(
                    yaxis=dict(
                        tickformat=",.0f",
                        ticksuffix=" "
                    )
                )
                
                st.plotly_chart(fig, use_container_width=True)
                
            # Add yearly payment breakdown charts (side-by-side)
            st.subheader("Yearly Payment Breakdown Comparison")
            
            col1, col2 = st.columns(2)
            
            # Generate yearly data for regular payment (no prepayment)
            with col1:
                # Calculate yearly payment data (without prepayment)
                regular_years = min(tenure_years, 20)  # Show up to 20 years
                regular_yearly_data = []
                
                # Regular payment calculation
                remaining_principal = loan_amount
                regular_monthly_rate = interest_rate / 12 / 100
                regular_emi = loan_amount * regular_monthly_rate * (1 + regular_monthly_rate) ** (tenure_years * 12) / ((1 + regular_monthly_rate) ** (tenure_years * 12) - 1)
                
                for year in range(1, regular_years + 1):
                    yearly_principal = 0
                    yearly_interest = 0
                    
                    for _ in range(12):  # 12 months in a year
                        if remaining_principal <= 0:
                            break
                            
                        monthly_interest = remaining_principal * regular_monthly_rate
                        monthly_principal = min(regular_emi - monthly_interest, remaining_principal)
                        
                        yearly_principal += monthly_principal
                        yearly_interest += monthly_interest
                        remaining_principal -= monthly_principal
                    
                    if yearly_principal > 0 or yearly_interest > 0:
                        regular_yearly_data.append({
                            "Year": year,
                            "Principal": yearly_principal,
                            "Interest": yearly_interest,
                            "Total": yearly_principal + yearly_interest
                        })
                        
                regular_df = pd.DataFrame(regular_yearly_data)
                
                # Create the chart
                st.write("### Without Prepayment")
                if not regular_df.empty:
                    fig = go.Figure()
                    fig.add_trace(go.Bar(
                        x=regular_df["Year"],
                        y=regular_df["Interest"],
                        name="Interest Paid",
                        marker_color="#E74C3C"
                    ))
                    fig.add_trace(go.Bar(
                        x=regular_df["Year"],
                        y=regular_df["Principal"],
                        name="Principal Paid",
                        marker_color="#3498DB"
                    ))
                    
                    fig.update_layout(
                        barmode="stack",
                        title="Yearly Payment Breakdown",
                        xaxis_title="Year",
                        yaxis_title="Amount (₹)",
                        legend=dict(
                            orientation="h",
                            yanchor="bottom",
                            y=1.02,
                            xanchor="right",
                            x=1
                        )
                    )
                    
                    st.plotly_chart(fig, use_container_width=True)
            
            # Generate yearly data with prepayment
            with col2:
                st.write("### With Prepayment")
                if not monthly_df.empty:
                    # Group the monthly data by year
                    monthly_df["Year"] = ((monthly_df["Month"] - 1) // 12) + 1
                    yearly_grouped = monthly_df.groupby("Year").agg({
                        "Principal": "sum",
                        "Interest": "sum",
                        "Prepayment": "sum"
                    }).reset_index()
                    
                    # Filter to 20 years maximum
                    yearly_grouped = yearly_grouped[yearly_grouped["Year"] <= 20]
                    
                    # Create the chart
                    fig = go.Figure()
                    fig.add_trace(go.Bar(
                        x=yearly_grouped["Year"],
                        y=yearly_grouped["Interest"],
                        name="Interest Paid",
                        marker_color="#E74C3C"
                    ))
                    fig.add_trace(go.Bar(
                        x=yearly_grouped["Year"],
                        y=yearly_grouped["Principal"],
                        name="Principal Paid",
                        marker_color="#3498DB"
                    ))
                    fig.add_trace(go.Bar(
                        x=yearly_grouped["Year"],
                        y=yearly_grouped["Prepayment"],
                        name="Prepayment",
                        marker_color="#2ECC71"
                    ))
                    
                    fig.update_layout(
                        barmode="stack",
                        title="Yearly Payment Breakdown with Prepayments",
                        xaxis_title="Year",
                        yaxis_title="Amount (₹)",
                        legend=dict(
                            orientation="h",
                            yanchor="bottom",
                            y=1.02,
                            xanchor="right",
                            x=1
                        )
                    )
                    
                    st.plotly_chart(fig, use_container_width=True)
            
            # Summary text
            st.success(f"""
            ### 💰 Prepayment Impact Summary
            
            With prepayments of **₹{total_prepaid:,.0f}**, you will:
            * Save **₹{interest_saved:,.0f}** in interest (about ₹{interest_saved/100000:.1f} lakhs)
            * Finish your loan **{time_saved//12} years and {time_saved%12} months** earlier
            * Reduce your total interest cost by **{interest_saved/regular_interest*100:.1f}%**
            """)
        
        # Tax benefit analysis
        st.subheader("💸 Tax Benefits (First Year)")
        
        tax_col1, tax_col2, tax_col3 = st.columns(3)
        with tax_col1:
            st.metric(
                "Interest Deduction",
                f"₹{yearly_interest_deduction:,.0f}",
                help="Deduction under Section 24(b)"
            )
        with tax_col2:
            st.metric(
                "Principal Deduction",
                f"₹{yearly_principal_deduction:,.0f}",
                help="Deduction under Section 80C"
            )
        with tax_col3:
            st.metric(
                "Additional Interest",
                f"₹{additional_interest_deduction:,.0f}",
                help="Additional deduction under Section 80EE/80EEA"
            )
        
        st.success(f"""
        ### 💰 Estimated Tax Savings (First Year)
        
        Based on your tax slab of {tax_slab}, your estimated tax saving for the first year is **₹{total_tax_benefit:,.0f}**
        
        This reduces your effective monthly cost to **₹{emi - (total_tax_benefit/12):,.0f}** after tax benefits.
        """)
        
        # Housing loan tips
        st.info("""
        ### 💡 Home Loan Tips
        
        1. **Part-prepayments:** Regular monthly prepayment of even small amounts can significantly reduce your interest burden and loan tenure
        
        2. **Prepayment strategies:** Choose the prepayment option that works best for you:
           - Monthly prepayments: Small regular amounts that compound over time
           - Annual prepayments: Larger lump sums from bonuses or tax refunds
           - Custom schedule: Target specific months based on your financial situation
        
        3. **Loan tenure:** Shorter loan tenure means higher EMI but much lower total interest cost
        
        4. **Tax benefits:** Utilize all available deductions under Sections 24(b), 80C, 80EE, and 80EEA as applicable
        
        5. **Rate negotiation:** Compare offers from multiple lenders and negotiate for the best interest rate
        
        6. **Balance transfer:** Consider switching to another lender if you get a significantly lower interest rate
        """)
        
        # Bank comparison table
        st.subheader("🏦 Home Loan Interest Rates Comparison")
        
        banks_data = {
            "Bank": [
                "SBI Home Loan",
                "HDFC Home Loan",
                "ICICI Home Loan",
                "Axis Bank Home Loan",
                "LIC Housing Finance",
                "PNB Home Loan",
                "Bank of Baroda Home Loan",
                "Kotak Mahindra Bank Home Loan"
            ],
            "Interest Rate (%)": [
                "8.40 - 9.15",
                "8.50 - 9.20",
                "8.75 - 9.25",
                "8.60 - 9.35",
                "8.65 - 9.50",
                "8.45 - 9.25",
                "8.50 - 9.30",
                "8.70 - 9.40"
            ],
            "Processing Fee": [
                "0.35% (Max ₹10,000)",
                "0.50% (Max ₹15,000)",
                "0.50% (Max ₹15,000)",
                "0.50% (Max ₹12,500)",
                "0.50% (Max ₹15,000)",
                "0.35% (Max ₹11,500)",
                "0.50% (Max ₹15,000)",
                "0.50% (Max ₹15,000)"
            ]
        }
        
        bank_df = pd.DataFrame(banks_data)
        st.table(bank_df)

# Personal Loan EMI Calculator
def show_personal_loan_calculator():
    """Show the personal loan calculator interface with Indian loan specifics"""
    st.header("Personal Loan EMI Calculator")
    st.write("""
    Calculate your personal loan EMI and understand the total interest cost over the loan tenure.
    This calculator helps you plan your finances by showing the complete breakdown of repayment
    including principal and interest components.
    """)
    
    st.warning("""
    **Disclaimer:** Personal loan EMI calculations are based on a fixed interest rate. Actual EMI amounts 
    may vary based on lender policies, your credit score, income level, and other eligibility factors. 
    This calculator is for illustrative purposes only and should not be considered financial advice.
    """)
    
    col1, col2 = st.columns(2)
    with col1:
        loan_amount = st.number_input(
            "Loan Amount (₹)",
            min_value=10000,
            max_value=5000000,
            value=500000,
            step=10000,
            help="The principal loan amount you want to borrow"
        )
        
        interest_rate = st.number_input(
            "Interest Rate (% p.a.)",
            min_value=8.0,
            max_value=36.0,
            value=14.0,
            step=0.1,
            help="Annual interest rate offered by the lender"
        )
    
    with col2:
        tenure_months = st.number_input(
            "Loan Tenure (Months)",
            min_value=3,
            max_value=84,
            value=36,
            step=1,
            help="Total duration of the loan in months"
        )
        
        processing_fee_percent = st.number_input(
            "Processing Fee (%)",
            min_value=0.0,
            max_value=5.0,
            value=1.0,
            step=0.1,
            help="One-time processing fee charged by the lender"
        )
    
    # Credit score section
    with st.expander("💳 Credit Score Impact"):
        st.write("""
        ### How Credit Score Affects Your Personal Loan
        
        Your credit score significantly impacts the interest rate you're offered:
        
        | Credit Score Range | Typical Interest Rate | Loan Eligibility |
        |-------------------|----------------------|------------------|
        | 750 - 900 | 10.5% - 14% | Excellent, best rates |
        | 700 - 749 | 14% - 16% | Good, competitive rates |
        | 650 - 699 | 16% - 18% | Fair, higher rates |
        | 600 - 649 | 18% - 24% | Poor, limited options |
        | Below 600 | 24% - 36% | Very difficult to get approved |
        """)
        
        credit_score = st.slider(
            "Your Credit Score",
            min_value=300,
            max_value=900,
            value=750,
            step=10,
            help="Your CIBIL/credit score impacts loan eligibility and interest rates"
        )
        
        # Provide tailored recommendations based on credit score
        if credit_score >= 750:
            st.success("✅ Excellent credit score! You qualify for the best interest rates.")
        elif credit_score >= 700:
            st.info("ℹ️ Good credit score. You should get competitive interest rates.")
        elif credit_score >= 650:
            st.warning("⚠️ Fair credit score. Expect higher than average interest rates.")
        else:
            st.error("🚨 Low credit score. Consider improving your score before applying or expect high interest rates.")
    
    if st.button("Calculate EMI", use_container_width=True):
        # Calculate EMI
        monthly_rate = interest_rate / 12 / 100
        emi = loan_amount * monthly_rate * (1 + monthly_rate) ** tenure_months / ((1 + monthly_rate) ** tenure_months - 1)
        
        # Calculate processing fee
        processing_fee = loan_amount * (processing_fee_percent / 100)
        loan_amount_disbursed = loan_amount - processing_fee
        
        # Calculate amortization schedule
        remaining_principal = loan_amount
        total_interest = 0
        amortization_schedule = []
        
        for month in range(1, tenure_months + 1):
            interest_payment = remaining_principal * monthly_rate
            principal_payment = emi - interest_payment
            remaining_principal -= principal_payment
            total_interest += interest_payment
            
            if month <= 12 or month % 12 == 0 or month == tenure_months:  # Show first year, yearly, and last payment
                amortization_schedule.append({
                    'Month': month,
                    'EMI': emi,
                    'Principal': principal_payment,
                    'Interest': interest_payment,
                    'Balance': max(0, remaining_principal)
                })
        
        total_payment = emi * tenure_months
        interest_percentage = (total_interest / loan_amount) * 100
        
        # Display results
        st.subheader("📊 Loan Summary")
        
        col1, col2, col3 = st.columns(3)
        with col1:
            st.metric(
                "Monthly EMI",
                f"₹{emi:,.2f}"
            )
        with col2:
            st.metric(
                "Total Interest",
                f"₹{total_interest:,.2f}",
                f"{interest_percentage:.1f}%"
            )
        with col3:
            st.metric(
                "Total Payment",
                f"₹{total_payment:,.2f}"
            )
            
        # Additional metrics
        col1, col2, col3 = st.columns(3)
        with col1:
            st.metric(
                "Processing Fee",
                f"₹{processing_fee:,.2f}"
            )
        with col2:
            st.metric(
                "Loan Amount Disbursed",
                f"₹{loan_amount_disbursed:,.2f}"
            )
        with col3:
            st.metric(
                "Annual Flat Rate Equivalent",
                f"{(interest_percentage / (tenure_months / 12)):.2f}%",
                help="This is the approximate flat rate equivalent of your reducing balance rate"
            )
        
        # Show EMI breakdown in a pie chart
        st.subheader("EMI Composition")
        fig = go.Figure(
            data=[
                go.Pie(
                    labels=["Principal", "Interest"],
                    values=[loan_amount, total_interest],
                    hole=0.4,
                    marker=dict(colors=["#2E86C1", "#E74C3C"]),
                )
            ]
        )
        fig.update_layout(title_text="Principal vs Interest")
        st.plotly_chart(fig, use_container_width=True)
        
        # Show amortization table
        st.subheader("Key Payment Schedule Milestones")
        
        df = pd.DataFrame(amortization_schedule)
        # Format the DataFrame for better display
        styled_df = df.style.format({
            'EMI': '₹{:,.2f}',
            'Principal': '₹{:,.2f}',
            'Interest': '₹{:,.2f}',
            'Balance': '₹{:,.2f}'
        })
        st.dataframe(styled_df)
        
        # Show monthly principal and interest trend
        st.subheader("Payment Breakdown Over Time")
        
        # Generate data for all months for the chart
        all_months = list(range(1, tenure_months + 1))
        principal_payments = []
        interest_payments = []
        balance_amounts = []
        
        # Reset for full calculation
        remaining_principal = loan_amount
        
        for month in range(1, tenure_months + 1):
            interest_payment = remaining_principal * monthly_rate
            principal_payment = emi - interest_payment
            remaining_principal -= principal_payment
            
            principal_payments.append(principal_payment)
            interest_payments.append(interest_payment)
            balance_amounts.append(max(0, remaining_principal))
        
        chart_data = pd.DataFrame({
            'Month': all_months,
            'Principal Payment': principal_payments,
            'Interest Payment': interest_payments,
            'Remaining Balance': balance_amounts
        })
        
        # Create the stacked bar chart
        fig1 = px.bar(
            chart_data,
            x='Month',
            y=['Principal Payment', 'Interest Payment'],
            title='Monthly Payment Breakdown',
            labels={'value': 'Amount (₹)', 'variable': 'Payment Type'},
            barmode='stack'
        )
        st.plotly_chart(fig1, use_container_width=True)
        
        # Create the line chart for remaining balance
        fig2 = px.line(
            chart_data,
            x='Month',
            y='Remaining Balance',
            title='Outstanding Balance Over Time',
            labels={'Remaining Balance': 'Balance (₹)'}
        )
        st.plotly_chart(fig2, use_container_width=True)
        
        # Affordability Analysis
        st.subheader("💰 Affordability Analysis")
        
        # Let user input their monthly income for affordability analysis
        monthly_income = st.number_input(
            "Your Monthly Take-Home Income (₹)",
            min_value=0,
            value=100000,
            step=5000,
            help="Your monthly income after tax and deductions"
        )
        
        if monthly_income > 0:
            emi_to_income_ratio = (emi / monthly_income) * 100
            
            col1, col2 = st.columns(2)
            with col1:
                st.metric(
                    "EMI to Income Ratio",
                    f"{emi_to_income_ratio:.1f}%"
                )
                
                # Add gauge chart for EMI to Income ratio
                fig = go.Figure(go.Indicator(
                    mode = "gauge+number",
                    value = emi_to_income_ratio,
                    domain = {'x': [0, 1], 'y': [0, 1]},
                    title = {'text': "EMI to Income Ratio"},
                    gauge = {
                        'axis': {'range': [0, 60], 'tickwidth': 1},
                        'steps': [
                            {'range': [0, 30], 'color': "lightgreen"},
                            {'range': [30, 40], 'color': "yellow"},
                            {'range': [40, 60], 'color': "salmon"}
                        ],
                        'threshold': {
                            'line': {'color': "red", 'width': 4},
                            'thickness': 0.75,
                            'value': emi_to_income_ratio
                        }
                    }
                ))
                st.plotly_chart(fig, use_container_width=True)
                
            with col2:
                # Affordability assessment
                if emi_to_income_ratio <= 30:
                    st.success("""
                    ✅ **Affordable Loan**
                    
                    Your EMI to income ratio is within the recommended limit of 30%.
                    This loan is likely affordable for your income level.
                    """)
                elif emi_to_income_ratio <= 40:
                    st.warning("""
                    ⚠️ **Moderately Stretched Budget**
                    
                    Your EMI to income ratio is between 30-40%.
                    This loan may strain your finances during emergencies.
                    Consider:
                    - Increasing the loan tenure
                    - Reducing the loan amount
                    - Finding a lower interest rate
                    """)
                else:
                    st.error("""
                    🚨 **High Financial Risk**
                    
                    Your EMI to income ratio is above 40%.
                    This loan poses a significant risk to your financial health.
                    Most lenders will not approve loans with this high ratio.
                    
                    Recommendations:
                    - Significantly reduce the loan amount
                    - Extend the tenure (but watch the total interest cost)
                    - Improve your credit score for better rates
                    - Explore alternative financing options
                    """)
        
        # Personal loan tips
        st.info("""
        ### 💡 Personal Loan Tips
        
        1. **Compare offers:** Get quotes from multiple lenders to find the best interest rate
        
        2. **Check all fees:** Besides interest rate, compare processing fee, prepayment charges, and late payment fees
        
        3. **Improve credit score:** Pay bills on time and reduce existing debt to qualify for better rates
        
        4. **Prepay when possible:** Make additional payments whenever you have surplus funds to reduce interest costs
        
        5. **Avoid multiple applications:** Too many loan inquiries can hurt your credit score
        """)
        
        # Lender comparison table
        st.subheader("🏦 Personal Loan Interest Rates Comparison")
        
        lenders_data = {
            "Lender": [
                "SBI Personal Loan",
                "HDFC Bank Personal Loan",
                "ICICI Bank Personal Loan",
                "Axis Bank Personal Loan",
                "Bajaj Finserv",
                "IDFC First Bank",
                "Tata Capital",
                "Fullerton India"
            ],
            "Interest Rate (%)": [
                "10.75 - 14.50",
                "10.75 - 15.50",
                "10.99 - 16.25",
                "12.00 - 21.00",
                "11.00 - 16.00",
                "10.49 - 18.00",
                "10.99 - 18.00",
                "11.99 - 24.00"
            ],
            "Processing Fee": [
                "1-2% (Max ₹10,000)",
                "Up to 2.50% (Min ₹4,999)",
                "Up to 2.25% (Min ₹2,500)",
                "Up to 2% (Min ₹5,000)",
                "Up to 3.99% (Min ₹2,000)",
                "Up to 2% (Min ₹999)",
                "Up to 2.5% (Min ₹1,999)",
                "Up to 3% (Min ₹2,500)"
            ]
        }
        
        lenders_df = pd.DataFrame(lenders_data)
        st.table(lenders_df)

# Car Loan EMI Calculator
def show_car_loan_calculator():
    """Show the car loan calculator interface with Indian specifics"""
    st.header("Car Loan EMI Calculator")
    st.write("""
    Calculate your car loan EMI and understand the total cost of ownership.
    This calculator helps you plan your car purchase by showing the complete breakdown
    of repayment, resale value estimation, and fuel cost considerations.
    """)
    
    st.warning("""
    **Disclaimer:** Car loan EMI calculations are based on fixed interest rates. Actual EMI amounts 
    may vary based on lender policies, your credit score, and other factors. This calculator is for 
    illustrative purposes only.
    """)
    
    # Car details section
    st.subheader("🚗 Car Details")
    col1, col2 = st.columns(2)
    with col1:
        car_price = st.number_input(
            "Car On-Road Price (₹)",
            min_value=100000,
            max_value=10000000,
            value=1000000,
            step=50000,
            help="The total on-road price including taxes and registration"
        )
        
        down_payment = st.number_input(
            "Down Payment (₹)",
            min_value=0,
            max_value=car_price,
            value=int(car_price * 0.2),  # Default 20% down payment
            step=10000,
            help="Initial payment made upfront (usually 10-20% of car price)"
        )
    
    with col2:
        car_type = st.selectbox(
            "Car Type",
            ["Hatchback", "Sedan", "SUV", "Luxury", "Electric"],
            index=1,
            help="Type of car - affects fuel efficiency and depreciation estimates"
        )
        
        fuel_type = st.selectbox(
            "Fuel Type",
            ["Petrol", "Diesel", "CNG", "Electric", "Hybrid"],
            index=0,
            help="Fuel type affects running costs and resale value"
        )
    
    # Loan details section
    st.subheader("💰 Loan Details")
    col1, col2 = st.columns(2)
    with col1:
        loan_amount = car_price - down_payment
        st.metric(
            "Loan Amount (₹)",
            f"₹{loan_amount:,.2f}"
        )
        
        interest_rate = st.number_input(
            "Interest Rate (% p.a.)",
            min_value=7.0,
            max_value=20.0,
            value=9.5,
            step=0.1,
            help="Annual interest rate offered by the lender"
        )
    
    with col2:
        tenure_years = st.number_input(
            "Loan Tenure (Years)",
            min_value=1,
            max_value=8,
            value=5,
            step=1,
            help="Total duration of the loan in years"
        )
        
        processing_fee_percent = st.number_input(
            "Processing Fee (%)",
            min_value=0.0,
            max_value=3.0,
            value=0.5,
            step=0.1,
            help="One-time processing fee charged by the lender"
        )
    
    # Additional cost considerations
    with st.expander("⚙️ Additional Cost Considerations"):
        col1, col2 = st.columns(2)
        with col1:
            fuel_efficiency = st.number_input(
                "Fuel Efficiency (km/L)",
                min_value=5.0,
                max_value=30.0,
                value=15.0 if fuel_type in ["Petrol", "Diesel"] else 20.0,
                step=0.5,
                help="Average fuel efficiency of the vehicle"
            )
            
            fuel_price = st.number_input(
                f"{fuel_type} Price (₹ per " + ("L" if fuel_type in ["Petrol", "Diesel", "CNG"] else "kWh") + ")",
                min_value=1.0,
                max_value=150.0,
                value=102.0 if fuel_type == "Petrol" else 90.0 if fuel_type == "Diesel" else 8.0 if fuel_type == "Electric" else 85.0,
                step=0.5,
                help=f"Current {fuel_type.lower()} price"
            )
        
        with col2:
            monthly_running = st.number_input(
                "Monthly Running (km)",
                min_value=100,
                max_value=5000,
                value=1000,
                step=100,
                help="Estimated monthly running of the vehicle"
            )
            
            maintenance_yearly = st.number_input(
                "Yearly Maintenance Cost (₹)",
                min_value=0,
                max_value=100000,
                value=12000 if car_type == "Hatchback" else 15000 if car_type == "Sedan" else 20000 if car_type in ["SUV", "Luxury"] else 8000,
                step=1000,
                help="Estimated yearly maintenance cost"
            )
    
    if st.button("Calculate EMI and Total Cost", use_container_width=True):
        # Convert tenure to months
        tenure_months = tenure_years * 12
        
        # Calculate EMI
        monthly_rate = interest_rate / 12 / 100
        emi = loan_amount * monthly_rate * (1 + monthly_rate) ** tenure_months / ((1 + monthly_rate) ** tenure_months - 1)
        
        # Calculate processing fee
        processing_fee = loan_amount * (processing_fee_percent / 100)
        
        # Calculate amortization schedule
        remaining_principal = loan_amount
        total_interest = 0
        amortization_schedule = []
        yearly_balance = []
        
        for month in range(1, tenure_months + 1):
            interest_payment = remaining_principal * monthly_rate
            principal_payment = emi - interest_payment
            remaining_principal -= principal_payment
            total_interest += interest_payment
            
            # Save yearly balances for depreciation comparison
            if month % 12 == 0 or month == tenure_months:
                yearly_balance.append(max(0, remaining_principal))
            
            if month <= 12 or month % 12 == 0 or month == tenure_months:  # Show first year, yearly, and last payment
                amortization_schedule.append({
                    'Month': month,
                    'EMI': emi,
                    'Principal': principal_payment,
                    'Interest': interest_payment,
                    'Balance': max(0, remaining_principal)
                })
        
        total_payment = emi * tenure_months
        
        # Fuel cost calculation
        if fuel_type != "Electric":
            monthly_fuel_cost = (monthly_running / fuel_efficiency) * fuel_price
        else:
            # For electric, assuming kWh per km
            monthly_fuel_cost = (monthly_running * (fuel_price / 10))  # Assuming 10km per kWh as a baseline
        
        yearly_fuel_cost = monthly_fuel_cost * 12
        total_fuel_cost = yearly_fuel_cost * tenure_years
        
        # Maintenance cost over loan period
        total_maintenance = maintenance_yearly * tenure_years
        
        # Calculate car depreciation
        # Depreciation rates vary by car type and fuel
        first_year_dep = 0.20 if car_type in ["Luxury", "Electric"] else 0.15  # 15-20% first year
        yearly_dep = 0.10 if car_type in ["Luxury", "Electric"] else 0.08  # 8-10% subsequent years
        
        depreciation_values = [car_price]
        current_value = car_price
        
        for year in range(1, tenure_years + 1):
            if year == 1:
                current_value *= (1 - first_year_dep)
            else:
                current_value *= (1 - yearly_dep)
            depreciation_values.append(current_value)
        
        resale_value = depreciation_values[-1]
        total_depreciation = car_price - resale_value
        
        # Total cost of ownership
        total_cost = down_payment + total_payment + processing_fee + total_fuel_cost + total_maintenance - resale_value
        cost_per_km = total_cost / (monthly_running * 12 * tenure_years)
        
        # Display results
        st.subheader("📊 Loan Summary")
        
        col1, col2, col3 = st.columns(3)
        with col1:
            st.metric(
                "Monthly EMI",
                f"₹{emi:,.2f}"
            )
        with col2:
            st.metric(
                "Total Interest",
                f"₹{total_interest:,.2f}"
            )
        with col3:
            st.metric(
                "Total Payment",
                f"₹{total_payment:,.2f}"
            )
        
        # Additional metrics
        col1, col2, col3 = st.columns(3)
        with col1:
            st.metric(
                "Processing Fee",
                f"₹{processing_fee:,.2f}"
            )
        with col2:
            st.metric(
                "Interest to Principal Ratio",
                f"{(total_interest / loan_amount) * 100:.1f}%"
            )
        with col3:
            st.metric(
                "Effective Monthly Cost",
                f"₹{(total_payment / tenure_months):,.2f}"
            )
        
        # Total Cost of Ownership Section
        st.subheader("💵 Total Cost of Ownership")
        
        col1, col2 = st.columns(2)
        with col1:
            # Create a pie chart for cost breakdown
            cost_breakdown = {
                "Down Payment": down_payment,
                "Principal Repayment": loan_amount,
                "Interest Paid": total_interest,
                "Fuel Cost": total_fuel_cost,
                "Maintenance": total_maintenance,
                "Processing Fee": processing_fee
            }
            
            cost_df = pd.DataFrame({
                'Category': list(cost_breakdown.keys()),
                'Amount': list(cost_breakdown.values())
            })
            
            fig = px.pie(
                cost_df,
                values='Amount',
                names='Category',
                title='Cost Breakdown Over Loan Period',
                hole=0.4
            )
            st.plotly_chart(fig, use_container_width=True)
            
        with col2:
            # Key metrics
            st.metric(
                "Total Cost of Ownership",
                f"₹{total_cost:,.2f}",
                help="Total cost including down payment, EMI, fuel, maintenance, minus resale value"
            )
            
            st.metric(
                "Cost Per Kilometer",
                f"₹{cost_per_km:.2f}",
                help="Cost per kilometer driven over the loan period"
            )
            
            st.metric(
                "Monthly Running Cost",
                f"₹{(monthly_fuel_cost + (maintenance_yearly / 12)):,.2f}",
                help="Monthly fuel and maintenance cost"
            )
            
            st.metric(
                "Estimated Resale Value",
                f"₹{resale_value:,.2f}",
                f"-{((car_price - resale_value) / car_price) * 100:.1f}%",
                help="Estimated value of the car at the end of loan tenure"
            )
        
        # Car Value vs Loan Balance
        st.subheader("Car Value vs. Loan Balance")
        
        # Create yearly data for comparison
        years = list(range(tenure_years + 1))
        
        # Ensure yearly_balance has the same length as depreciation_values
        if len(yearly_balance) < len(years) - 1:  # -1 because we added initial car price
            # Add initial loan amount at the beginning
            yearly_balance.insert(0, loan_amount)
        else:
            # Add initial loan amount at the beginning
            yearly_balance = [loan_amount] + yearly_balance
        
        # Create a clear visualization
        value_comparison = pd.DataFrame({
            'Year': years,
            'Car Value': depreciation_values,
            'Loan Balance': [yearly_balance[min(i, len(yearly_balance)-1)] for i in range(len(years))]
        })
        
        fig = px.line(
            value_comparison,
            x='Year',
            y=['Car Value', 'Loan Balance'],
            title='Car Value vs. Loan Balance Over Time',
            labels={'value': 'Amount (₹)'},
            markers=True
        )
        st.plotly_chart(fig, use_container_width=True)
        
        # Add explanation about underwater loan
        underwater_years = []
        for i in range(len(years)):
            if value_comparison.loc[i, 'Car Value'] < value_comparison.loc[i, 'Loan Balance']:
                underwater_years.append(years[i])
        
        if underwater_years:
            st.warning(f"""
            ⚠️ **Underwater Loan Alert**
            
            Your loan balance exceeds the car value in year(s): {', '.join(map(str, underwater_years))}
            
            This means if you sell the car during this period, you'll still need to pay the remaining loan amount.
            Consider increasing your down payment or reducing the loan tenure.
            """)
        else:
            st.success("""
            ✅ **Positive Equity**
            
            Your car value remains higher than the loan balance throughout the loan period.
            This gives you flexibility to sell or upgrade if needed.
            """)
        
        # EMI breakdown in a pie chart
        st.subheader("EMI Composition")
        fig = go.Figure(
            data=[
                go.Pie(
                    labels=["Principal", "Interest"],
                    values=[loan_amount, total_interest],
                    hole=0.4,
                    marker=dict(colors=["#2E86C1", "#E74C3C"]),
                )
            ]
        )
        fig.update_layout(title_text="Principal vs Interest")
        st.plotly_chart(fig, use_container_width=True)
        
        # Show amortization table for key periods
        st.subheader("Key Payment Schedule Milestones")
        
        df = pd.DataFrame(amortization_schedule)
        # Format the DataFrame for better display
        styled_df = df.style.format({
            'EMI': '₹{:,.2f}',
            'Principal': '₹{:,.2f}',
            'Interest': '₹{:,.2f}',
            'Balance': '₹{:,.2f}'
        })
        st.dataframe(styled_df)
        
        # Car loan tips
        st.info("""
        ### 💡 Car Loan Tips
        
        1. **Higher down payment** reduces EMI and total interest cost
        
        2. **Shorter loan tenure** increases EMI but drastically reduces total interest
        
        3. **Loan pre-payment** can save significant interest if done in early years
        
        4. **Consider running costs** (fuel, maintenance, insurance) while planning your budget
        
        5. **Check resale value trends** of the chosen car model before purchase
        """)
        
        # Car loan lender comparison
        st.subheader("🏦 Car Loan Interest Rates Comparison")
        
        car_lenders_data = {
            "Lender": [
                "SBI Car Loan",
                "HDFC Bank Car Loan",
                "ICICI Bank Car Loan",
                "Axis Bank Car Loan",
                "Bank of Baroda",
                "Kotak Mahindra Bank",
                "Tata Capital",
                "Mahindra Finance"
            ],
            "Interest Rate (%)": [
                "8.85 - 9.55",
                "8.80 - 9.80",
                "9.00 - 10.00",
                "9.05 - 11.05",
                "8.70 - 10.70",
                "9.05 - 15.00",
                "9.50 - 15.00",
                "10.00 - 15.00"
            ],
            "Processing Fee": [
                "0.40% (Max ₹10,000)",
                "0.50% (Max ₹10,000)",
                "0.50% (Min ₹3,000)",
                "Up to 1% (Min ₹5,000)",
                "0.50% (Max ₹10,000)",
                "Up to 1% (Min ₹1,999)",
                "Up to 2% (Min ₹2,000)",
                "Up to 2.50% (Min ₹2,500)"
            ],
            "Prepayment Penalty": [
                "Nil",
                "Nil for floating rate",
                "5% for fixed rate, nil for floating",
                "Nil for floating rate",
                "Nil for individuals",
                "4% for fixed rate",
                "2-5% of outstanding",
                "5% of outstanding"
            ]
        }
        
        car_lenders_df = pd.DataFrame(car_lenders_data)
        st.table(car_lenders_df)

# Education Loan EMI Calculator
def show_education_loan_calculator():
    """Show the education loan calculator interface tailored for Indian educational loans"""
    st.header("Education Loan EMI Calculator")
    st.write("""
    Calculate your education loan EMI and understand the repayment schedule for your studies.
    This calculator helps students and parents plan for education expenses and loan repayment
    with special features relevant to Indian education loans.
    """)
    
    st.warning("""
    **Disclaimer:** Education loan EMI calculations are based on fixed interest rates. Actual EMI amounts 
    may vary based on lender policies, course type, and institution reputation. This calculator is for 
    illustrative purposes only and should not be considered financial advice.
    """)
    
    # Course and institution details section
    st.subheader("📚 Course & Institution Details")
    col1, col2 = st.columns(2)
    with col1:
        course_type = st.selectbox(
            "Course Type",
            [
                "Engineering (B.Tech/BE)",
                "Management (MBA/PGDM)",
                "Medical (MBBS/BDS)",
                "Law (LLB)",
                "Arts & Science (BA/BSc/BCom)",
                "Masters (MSc/MA/MCom)",
                "PhD/Doctoral",
                "Foreign Education",
                "Vocational Training",
                "Other"
            ],
            index=0,
            help="Type of course you're pursuing or planning to pursue"
        )
        
        institution_location = st.selectbox(
            "Institution Location",
            ["India", "USA", "UK", "Canada", "Australia", "Europe", "Asia", "Other"],
            index=0,
            help="Country where the educational institution is located"
        )
    
    with col2:
        institution_type = st.selectbox(
            "Institution Type",
            ["Government/Public", "Private", "Deemed University", "Autonomous", "Foreign"],
            index=0,
            help="Type of educational institution - affects interest rates offered by banks"
        )
        
        course_duration = st.number_input(
            "Course Duration (Years)",
            min_value=1,
            max_value=7,
            value=4,
            step=1,
            help="Total duration of your course in years"
        )
    
    # Loan details section
    st.subheader("💰 Loan Details")
    col1, col2 = st.columns(2)
    with col1:
        loan_amount = st.number_input(
            "Loan Amount (₹)",
            min_value=50000,
            max_value=10000000,
            value=1000000,
            step=50000,
            help="The total education loan amount you need to borrow"
        )
        
        interest_rate = st.number_input(
            "Interest Rate (% p.a.)",
            min_value=7.0,
            max_value=16.0,
            value=9.0 if institution_location == "India" else 11.0,
            step=0.1,
            help="Annual interest rate offered by the lender"
        )
    
    with col2:
        repayment_period = st.number_input(
            "Repayment Period (Years)",
            min_value=1,
            max_value=15,
            value=7,
            step=1,
            help="Loan repayment tenure in years (after moratorium period)"
        )
        
        moratorium_period = st.number_input(
            "Moratorium Period (Years)",
            min_value=0,
            max_value=5,
            value=course_duration,
            step=1,
            help="Period during which you only pay interest or nothing (usually course duration + 6-12 months)"
        )
    
    # Special education loan features
    with st.expander("🔍 Special Education Loan Features"):
        col1, col2 = st.columns(2)
        with col1:
            interest_during_moratorium = st.radio(
                "Interest During Moratorium",
                ["Simple interest to be paid", "Simple interest accumulated", "No interest during moratorium"],
                index=1,
                help="How interest is handled during moratorium period"
            )
            
            tax_benefit = st.checkbox(
                "Include Section 80E Tax Benefit Analysis",
                value=True,
                help="Section 80E of Income Tax Act allows deduction of interest paid on education loan"
            )
        
        with col2:
            collateral_required = st.checkbox(
                "Loan Requires Collateral",
                value=False if loan_amount <= 400000 else True,
                help="Whether the loan requires collateral security (usually for loans above ₹4 lakhs)"
            )
            
            income_tax_bracket = st.selectbox(
                "Expected Income Tax Bracket After Studies",
                ["5%", "10%", "15%", "20%", "30%"],
                index=2,
                help="Your expected income tax bracket when you start repaying loan"
            )
    
    if st.button("Calculate Education Loan EMI", use_container_width=True):
        # Convert periods to months
        repayment_months = repayment_period * 12
        moratorium_months = moratorium_period * 12
        
        # Calculate interest rate per month
        monthly_rate = interest_rate / 12 / 100
        
        # Calculate interest during moratorium
        moratorium_interest = 0
        if moratorium_period > 0:
            if interest_during_moratorium == "Simple interest accumulated":
                moratorium_interest = loan_amount * (interest_rate / 100) * moratorium_period
            # If "Simple interest to be paid", it's not added to principal
        
        # Adjust principal with accumulated interest if applicable
        adjusted_principal = loan_amount
        if interest_during_moratorium == "Simple interest accumulated":
            adjusted_principal += moratorium_interest
        
        # Calculate EMI
        emi = adjusted_principal * monthly_rate * (1 + monthly_rate) ** repayment_months / ((1 + monthly_rate) ** repayment_months - 1)
        
        # Calculate amortization schedule
        remaining_principal = adjusted_principal
        total_interest = 0
        amortization_schedule = []
        
        for month in range(1, repayment_months + 1):
            interest_payment = remaining_principal * monthly_rate
            principal_payment = emi - interest_payment
            remaining_principal -= principal_payment
            total_interest += interest_payment
            
            if month <= 12 or month % 12 == 0 or month == repayment_months:  # Show first year, yearly, and last payment
                amortization_schedule.append({
                    'Month': month,
                    'EMI': emi,
                    'Principal': principal_payment,
                    'Interest': interest_payment,
                    'Balance': max(0, remaining_principal)
                })
        
        total_payment = emi * repayment_months
        
        # Tax Benefit Calculation (Section 80E) - only for interest component
        tax_bracket_rate = float(income_tax_bracket.strip('%')) / 100
        tax_saving = 0
        if tax_benefit:
            tax_saving = total_interest * tax_bracket_rate
        
        # Display results
        st.subheader("📊 Loan Summary")
        
        col1, col2, col3 = st.columns(3)
        with col1:
            st.metric(
                "Monthly EMI",
                f"₹{emi:,.2f}",
                help="EMI starts after moratorium period"
            )
        with col2:
            st.metric(
                "Total Interest",
                f"₹{total_interest:,.2f}",
                f"{((total_interest/loan_amount) * 100):.1f}% of principal"
            )
        with col3:
            st.metric(
                "Total Payment",
                f"₹{total_payment:,.2f}"
            )
        
        # Moratorium details
        if moratorium_period > 0:
            st.subheader("⏳ Moratorium Period Details")
            
            col1, col2 = st.columns(2)
            with col1:
                st.metric(
                    "Interest During Moratorium",
                    f"₹{moratorium_interest:,.2f}",
                    help="Interest accumulated during moratorium period"
                )
                
                if interest_during_moratorium == "Simple interest to be paid":
                    monthly_interest_payment = (loan_amount * (interest_rate / 100)) / 12
                    st.metric(
                        "Monthly Interest Payment During Study",
                        f"₹{monthly_interest_payment:,.2f}",
                        help="Monthly interest payment required during moratorium"
                    )
            
            with col2:
                st.metric(
                    "Principal After Moratorium",
                    f"₹{adjusted_principal:,.2f}",
                    f"{((adjusted_principal - loan_amount) / loan_amount * 100):.1f}%" if adjusted_principal > loan_amount else None
                )
                
                st.metric(
                    "Moratorium Period",
                    f"{moratorium_period} years ({moratorium_months} months)"
                )
        
        # Tax benefit details
        if tax_benefit:
            st.subheader("💸 Tax Benefit Analysis (Section 80E)")
            
            col1, col2 = st.columns(2)
            with col1:
                st.metric(
                    "Estimated Tax Savings",
                    f"₹{tax_saving:,.2f}"
                )
                
                st.metric(
                    "Effective Interest Cost After Tax Benefit",
                    f"₹{(total_interest - tax_saving):,.2f}",
                    f"-{(tax_saving / total_interest * 100):.1f}%"
                )
            
            with col2:
                st.info("""
                ### Section 80E Tax Benefit
                
                Under Section 80E of the Income Tax Act, the entire interest paid on an education loan is 
                eligible for tax deduction. There is no upper limit specified for this deduction.
                
                **Key points:**
                - Only interest component qualifies for deduction
                - Available for higher education loans only
                - Available for 8 years or until interest is fully paid, whichever is earlier
                - Can be claimed for loans taken for self, spouse, or children
                """)
        
        # Loan timeline visualization
        st.subheader("📅 Loan Timeline")
        
        # Create timeline data
        years = list(range(moratorium_period + repayment_period + 1))
        timeline_values = []
        
        # Initial value
        timeline_values.append(0)
        
        # During moratorium
        for i in range(1, moratorium_period + 1):
            if interest_during_moratorium == "Simple interest accumulated":
                # Linear increase based on simple interest
                timeline_values.append(loan_amount + (loan_amount * (interest_rate / 100) * i))
            else:
                # Principal stays the same
                timeline_values.append(loan_amount)
        
        # During repayment
        remaining = adjusted_principal
        for i in range(moratorium_period + 1, moratorium_period + repayment_period + 1):
            # Decrease based on yearly EMI payments
            remaining -= (emi * 12 - (remaining * monthly_rate * 12))
            timeline_values.append(max(0, remaining))
        
        # Create a timeline DataFrame
        timeline_df = pd.DataFrame({
            'Year': years,
            'Loan Balance': timeline_values
        })
        
        # Add markers for key events
        markers = []
        annotations = []
        
        # Start of loan
        markers.append({
            'x': 0,
            'y': 0,
            'text': 'Loan Start'
        })
        
        # Loan disbursement
        markers.append({
            'x': 1,
            'y': loan_amount,
            'text': 'Loan Disbursed'
        })
        
        # End of moratorium
        if moratorium_period > 0:
            markers.append({
                'x': moratorium_period,
                'y': timeline_values[moratorium_period],
                'text': 'Moratorium Ends'
            })
        
        # End of repayment
        markers.append({
            'x': moratorium_period + repayment_period,
            'y': 0,
            'text': 'Loan Closed'
        })
        
        # Create timeline chart
        fig = px.line(
            timeline_df,
            x='Year',
            y='Loan Balance',
            title='Education Loan Balance Over Time',
            labels={'Loan Balance': 'Balance (₹)'},
            markers=True
        )
        
        # Add annotations for key events
        for marker in markers:
            fig.add_annotation(
                x=marker['x'],
                y=marker['y'],
                text=marker['text'],
                showarrow=True,
                arrowhead=1
            )
        
        # Add rectangle for moratorium period
        if moratorium_period > 0:
            fig.add_shape(
                type="rect",
                x0=0,
                y0=0,
                x1=moratorium_period,
                y1=max(timeline_values) * 1.1,
                fillcolor="rgba(173, 216, 230, 0.3)",
                line=dict(width=0),
                layer="below"
            )
            
            # Add text for the moratorium period
            fig.add_annotation(
                x=moratorium_period / 2,
                y=max(timeline_values) * 1.05,
                text="Moratorium Period",
                showarrow=False,
                font=dict(size=12)
            )
        
        st.plotly_chart(fig, use_container_width=True)
        
        # Show amortization table for key periods
        st.subheader("Key Payment Schedule Milestones")
        
        df = pd.DataFrame(amortization_schedule)
        # Format the DataFrame for better display
        styled_df = df.style.format({
            'EMI': '₹{:,.2f}',
            'Principal': '₹{:,.2f}',
            'Interest': '₹{:,.2f}',
            'Balance': '₹{:,.2f}'
        })
        st.dataframe(styled_df)
        
        # EMI breakdown in a pie chart
        st.subheader("EMI Composition")
        fig = go.Figure(
            data=[
                go.Pie(
                    labels=["Principal", "Interest"],
                    values=[adjusted_principal, total_interest],
                    hole=0.4,
                    marker=dict(colors=["#2E86C1", "#E74C3C"]),
                )
            ]
        )
        fig.update_layout(title_text="Principal vs Interest")
        st.plotly_chart(fig, use_container_width=True)
        
        # Education loan tips
        st.info("""
        ### 💡 Education Loan Tips
        
        1. **Shop around for the best rates** - Interest rates can vary significantly between lenders
        
        2. **Consider co-applicants** - Having a parent/guardian as co-applicant can help secure better rates
        
        3. **Take advantage of tax benefits** - Section 80E allows deduction of interest paid on education loans
        
        4. **Negotiate loan terms** - Some banks offer more favorable terms for premier institutions
        
        5. **Make part-payments during studies** - If possible, paying interest during the moratorium period reduces overall burden
        
        6. **Start repayment early** - Consider starting repayment before moratorium ends if you get a job during studies
        """)
        
        # Education loan comparison
        st.subheader("🏦 Education Loan Comparison")
        
        education_lenders_data = {
            "Lender": [
                "SBI Education Loan",
                "HDFC Credila",
                "Bank of Baroda",
                "Axis Bank",
                "Punjab National Bank",
                "Canara Bank",
                "ICICI Bank",
                "Bank of India"
            ],
            "Interest Rate (%)": [
                "8.85 - 11.15",
                "8.70 - 13.50",
                "8.80 - 10.80",
                "9.70 - 12.70",
                "8.50 - 9.90",
                "8.55 - 9.50",
                "10.50 - 13.00",
                "8.35 - 10.65"
            ],
            "Max Loan Without Collateral": [
                "₹4,00,000",
                "₹4,00,000",
                "₹7,50,000",
                "₹4,00,000",
                "₹10,00,000",
                "₹4,00,000",
                "₹4,00,000",
                "₹7,50,000"
            ],
            "Moratorium Period": [
                "Course + 1 year",
                "Course + 6 months",
                "Course + 1 year",
                "Course + 1 year",
                "Course + 1 year",
                "Course + 6 months",
                "Course + 6 months",
                "Course + 1 year"
            ]
        }
        
        education_lenders_df = pd.DataFrame(education_lenders_data)
        st.table(education_lenders_df)

# Gratuity Calculator
def show_gratuity_calculator():
    st.header("Gratuity Calculator")
    st.write("""
    Calculate your gratuity amount based on your salary and years of service as per Indian labor laws.
    Gratuity is a benefit that employers provide to employees who have rendered continuous service for at least 5 years.
    """)
    
    # Explanatory information
    with st.expander("What is Gratuity?", expanded=False):
        st.write("""
        **Gratuity** is a lump sum payment made by an employer to an employee in appreciation of the service rendered by the employee 
        when they leave the organization. In India, gratuity payment is governed by the Payment of Gratuity Act, 1972. 
        
        **Key points about gratuity:**
        
        1. **Eligibility:** Employees become eligible for gratuity after completing 5 years of continuous service.
        
        2. **Formula:** Gratuity = (15 × Last Drawn Salary × Years of Service) ÷ 26
           * Last drawn salary includes basic salary and dearness allowance
           * For employees not covered under the Gratuity Act, the formula may be different as per company policy
        
        3. **Tax Exemption:** Gratuity up to ₹20 lakhs is exempt from income tax
        
        4. **Payment Scenarios:** Gratuity is payable on:
           * Retirement
           * Resignation
           * Death or disablement due to accident or disease
        """)
    
    col1, col2 = st.columns(2)
    with col1:
        monthly_salary = st.number_input(
            "Last Drawn Monthly Basic Salary + DA (₹)",
            min_value=0,
            value=50000,
            step=1000
        )
        
        service_years = st.number_input(
            "Years of Service",
            min_value=0.0,
            value=10.0,
            step=0.5,
            help="Enter the total number of years worked. Partial years can be entered (e.g., 5.5 for 5 years and 6 months)"
        )
    
    with col2:
        calculation_method = st.selectbox(
            "Calculation Method",
            ["As per Gratuity Act", "26 Days a Month (Standard)", "30 Days a Month (Alternative)"],
            index=0
        )
        
        is_govt_employee = st.checkbox(
            "Government Employee",
            value=False,
            help="Government employees have different gratuity calculation rules"
        )
    
    if st.button("Calculate Gratuity", use_container_width=True):
        # Determine if eligible for gratuity
        is_eligible = service_years >= 5
        
        # Calculate gratuity based on selected method
        if is_govt_employee:
            # Government employee calculation: (Basic Salary × Service Years)/2
            gratuity_amount = (monthly_salary * service_years) / 2
        else:
            # Private sector calculation
            if calculation_method == "As per Gratuity Act" or calculation_method == "26 Days a Month (Standard)":
                # Standard formula: (15 × Last Drawn Salary × Years of Service) ÷ 26
                gratuity_amount = (15 * monthly_salary * service_years) / 26
            else:
                # Alternative formula: (Last Drawn Salary × Years of Service) ÷ 2
                gratuity_amount = (monthly_salary * service_years) / 2
        
        # Display results
        st.subheader("📊 Gratuity Calculation Results")
        
        if not is_eligible and not is_govt_employee:
            st.warning("""
            **You are not eligible for gratuity payment under the Gratuity Act.**
            
            The Payment of Gratuity Act requires a minimum of 5 years of continuous service.
            However, your organization may have its own policy regarding gratuity for employees with less than 5 years of service.
            """)
            
            # Still show the calculation for reference
            st.info("Below calculation is shown for reference only, as per the standard formula:")
        
        # Display gratuity amount
        st.metric(
            "Estimated Gratuity Amount",
            f"₹{gratuity_amount:,.2f}"
        )
        
        # Tax implications
        tax_exempt_limit = 2000000  # ₹20 lakhs
        taxable_amount = max(0, gratuity_amount - tax_exempt_limit)
        
        col1, col2 = st.columns(2)
        with col1:
            st.metric(
                "Tax-Exempt Amount",
                f"₹{min(gratuity_amount, tax_exempt_limit):,.2f}"
            )
        with col2:
            st.metric(
                "Taxable Amount",
                f"₹{taxable_amount:,.2f}" if taxable_amount > 0 else "₹0.00 (Fully Exempt)"
            )
        
        # Service period breakdown
        st.subheader("Service Period Analysis")
        
        # Calculate monthly gratuity accrual
        if is_govt_employee:
            monthly_accrual = monthly_salary / 24  # Half month salary per year of service
        else:
            if calculation_method == "As per Gratuity Act" or calculation_method == "26 Days a Month (Standard)":
                monthly_accrual = (15 * monthly_salary) / (26 * 12)  # 15 days salary per year, divided by 26, divided by 12 months
            else:
                monthly_accrual = monthly_salary / 24  # Half month salary per year of service
        
        # Create visualization data
        years = list(range(int(min(5, service_years)), int(service_years) + 11))
        if is_govt_employee:
            gratuity_values = [(monthly_salary * year) / 2 for year in years]
        else:
            if calculation_method == "As per Gratuity Act" or calculation_method == "26 Days a Month (Standard)":
                gratuity_values = [(15 * monthly_salary * year) / 26 for year in years]
            else:
                gratuity_values = [(monthly_salary * year) / 2 for year in years]
        
        # Create dataframe for visualization
        df = pd.DataFrame({
            'Years of Service': years,
            'Gratuity Amount': gratuity_values
        })
        
        # Plot gratuity growth
        fig = px.line(
            df,
            x='Years of Service',
            y='Gratuity Amount',
            title='Gratuity Amount Based on Years of Service',
            labels={'Gratuity Amount': 'Amount (₹)'}
        )
        
        # Add marker for current service period
        fig.add_scatter(
            x=[service_years],
            y=[gratuity_amount],
            mode='markers',
            marker=dict(size=12, color='red'),
            name='Current Service Period',
            showlegend=True
        )
        
        # Add marker for minimum eligibility (5 years)
        if service_years < 5:
            min_eligible_gratuity = (15 * monthly_salary * 5) / 26 if not is_govt_employee else (monthly_salary * 5) / 2
            fig.add_scatter(
                x=[5],
                y=[min_eligible_gratuity],
                mode='markers',
                marker=dict(size=12, color='green'),
                name='Minimum Eligibility (5 years)',
                showlegend=True
            )
        
        st.plotly_chart(fig, use_container_width=True)
        
        # Additional insights
        st.subheader("💡 Key Insights")
        
        # Monthly accrual
        st.info(f"""
        **Gratuity Accrual Rate:**
        - You are accruing approximately ₹{monthly_accrual:,.2f} per month towards gratuity
        - This is equivalent to ₹{monthly_accrual * 12:,.2f} per year
        """)
        
        # Eligibility status
        if service_years < 5 and not is_govt_employee:
            remaining_years = 5 - service_years
            remaining_gratuity = (15 * monthly_salary * 5) / 26 - gratuity_amount
            
            st.warning(f"""
            **Eligibility Status:**
            - You need {remaining_years:.1f} more years of service to become eligible for gratuity
            - At your current salary, waiting until eligibility would increase your gratuity by ₹{remaining_gratuity:,.2f}
            """)
        
        # Tax implications
        if gratuity_amount > tax_exempt_limit:
            tax_rate = 30  # Assumed highest tax slab
            estimated_tax = taxable_amount * (tax_rate / 100)
            
            st.warning(f"""
            **Tax Implications:**
            - Your gratuity exceeds the tax-exempt limit of ₹20 lakhs
            - The excess amount of ₹{taxable_amount:,.2f} may be taxable according to your income tax slab
            - At {tax_rate}% tax rate, this could result in approximately ₹{estimated_tax:,.2f} in taxes
            - Consult a tax professional for accurate tax assessment
            """)
        
        # Investment suggestion
        st.success("""
        **Optimizing Your Gratuity:**
        - Consider investing your gratuity amount in tax-efficient instruments
        - Options include PPF, ELSS, or Senior Citizens' Saving Scheme (if applicable)
        - If planning for retirement, consider transferring to NPS for additional tax benefits
        """)

# Health Insurance Premium Calculator
def show_health_insurance_calculator():
    """Show health insurance premium calculator interface"""
    st.header("Health Insurance Premium Calculator")
    st.write("""
    Calculate the estimated premium for your health insurance policy based on your age, family size, 
    health conditions, and coverage requirements. This calculator gives you a comprehensive 
    view of health insurance costs in India.
    """)
    
    st.warning("""
    **Disclaimer:** The premium calculations provided are estimates based on market trends and may vary 
    from actual premiums offered by insurers. Coverage, add-ons, and other factors may impact the final premium.
    Consult with insurance providers for exact quotes.
    """)
    
    # Personal Information
    st.subheader("📋 Personal Information")
    col1, col2 = st.columns(2)
    with col1:
        age = st.number_input(
            "Your Age",
            min_value=1,
            max_value=99,
            value=35,
            help="Your current age (primary policyholder)"
        )
        
        city_tier = st.selectbox(
            "City Tier",
            ["Tier 1 (Metro)", "Tier 2 (Urban)", "Tier 3 (Semi-urban/Rural)"],
            index=0,
            help="Cities are categorized based on population and infrastructure. Tier 1 includes metros like Delhi, Mumbai, Bangalore, etc."
        )
    
    with col2:
        gender = st.radio(
            "Gender",
            ["Male", "Female"], 
            horizontal=True,
            help="Gender can affect premium rates in some insurance plans"
        )
        
        occupation = st.selectbox(
            "Occupation Category",
            ["Salaried", "Self-employed", "Professional", "Business owner", "Others"],
            index=0,
            help="Your occupation may impact risk assessment"
        )
    
    # Family Information
    st.subheader("👨‍👩‍👧‍👦 Family Information")
    
    col1, col2 = st.columns(2)
    with col1:
        policy_type = st.radio(
            "Policy Type",
            ["Individual", "Family Floater", "Senior Citizen", "Critical Illness"],
            index=1,
            help="Family floater covers multiple family members under a single sum insured"
        )
        
        if policy_type == "Family Floater":
            family_size = st.number_input(
                "Number of Family Members",
                min_value=2,
                max_value=8,
                value=4,
                help="Total number of people to be covered under the policy"
            )
        else:
            family_size = 1
    
    with col2:
        if policy_type == "Family Floater":
            has_senior_citizens = st.checkbox(
                "Includes Members Above 60 Years",
                value=False,
                help="Premium increases significantly for senior citizens"
            )
            
            has_children = st.checkbox(
                "Includes Children (Below 18 Years)",
                value=True,
                help="Including children may require specific coverage options"
            )
        
        maternity_coverage = st.checkbox(
            "Need Maternity Coverage",
            value=False,
            help="Adds coverage for pregnancy and childbirth related expenses"
        )
    
    # Health Details
    st.subheader("🏥 Health Details & Coverage")
    
    col1, col2 = st.columns(2)
    with col1:
        pre_existing_diseases = st.multiselect(
            "Pre-existing Conditions",
            [
                "None", "Diabetes", "Hypertension/High BP", "Heart Disease", 
                "Asthma/Respiratory Issues", "Thyroid Disorder",
                "Cancer History", "Obesity", "Other Chronic Conditions"
            ],
            default=["None"],
            help="Existing medical conditions that you have been diagnosed with"
        )
        
        if "None" in pre_existing_diseases and len(pre_existing_diseases) > 1:
            st.error("Please select either 'None' or specific conditions, not both")
            pre_existing_diseases = [condition for condition in pre_existing_diseases if condition != "None"]
            if not pre_existing_diseases:
                pre_existing_diseases = ["None"]
        
        smoking_status = st.radio(
            "Tobacco/Smoking Habit",
            ["Non-smoker", "Occasional", "Regular smoker"],
            index=0,
            help="Smoking/tobacco habits affect premium rates significantly"
        )
    
    with col2:
        sum_insured = st.select_slider(
            "Sum Insured (₹)",
            options=[
                "3 Lakh", "5 Lakh", "10 Lakh", "15 Lakh", 
                "20 Lakh", "25 Lakh", "50 Lakh", "1 Crore"
            ],
            value="5 Lakh",
            help="The maximum coverage amount provided by the insurance policy"
        )
        
        # Convert sum insured to numeric value for calculations
        sum_insured_map = {
            "3 Lakh": 300000,
            "5 Lakh": 500000,
            "10 Lakh": 1000000,
            "15 Lakh": 1500000,
            "20 Lakh": 2000000,
            "25 Lakh": 2500000,
            "50 Lakh": 5000000,
            "1 Crore": 10000000
        }
        sum_insured_value = sum_insured_map[sum_insured]
        
        room_rent_category = st.radio(
            "Room Rent Limit Preference",
            ["Standard (1% of sum insured)", "Shared Room", "Single Private Room", "Any Room (No capping)"],
            index=2,
            help="Daily room rent limit affects premium. Higher category rooms increase premium."
        )
    
    # Additional coverage options
    with st.expander("🔍 Additional Coverage Options"):
        col1, col2 = st.columns(2)
        with col1:
            restore_benefit = st.checkbox(
                "Restore/Refill Benefit",
                value=True,
                help="Restores sum insured if exhausted during policy period"
            )
            
            no_claim_bonus = st.checkbox(
                "No Claim Bonus Protection",
                value=True,
                help="Protects no claim bonus even if a claim is made"
            )
            
            annual_health_checkup = st.checkbox(
                "Annual Health Checkup",
                value=True,
                help="Free annual health checkups for all insured members"
            )
        
        with col2:
            daily_hospital_cash = st.checkbox(
                "Daily Hospital Cash",
                value=False,
                help="Additional daily amount paid during hospitalization"
            )
            
            critical_illness_cover = st.checkbox(
                "Critical Illness Rider",
                value=False,
                help="Additional coverage for defined critical illnesses"
            )
            
            personal_accident_cover = st.checkbox(
                "Personal Accident Cover",
                value=False,
                help="Coverage against accidental death or disability"
            )
    
    # Premium calculation button
    if st.button("Calculate Health Insurance Premium", use_container_width=True):
        # Base premium calculation based on age and sum insured
        if policy_type == "Individual":
            # Base annual premium calculation for individual
            if age < 30:
                base_premium = sum_insured_value * 0.02
            elif age < 45:
                base_premium = sum_insured_value * 0.025
            elif age < 60:
                base_premium = sum_insured_value * 0.03
            else:
                base_premium = sum_insured_value * 0.055
                
            # Age calculations for individual policy
            age_factor = 1 + (age / 100)
            base_premium *= age_factor
            
        elif policy_type == "Family Floater":
            # Base premium for family floater
            # Consider highest age member as primary factor
            effective_age = age
            if has_senior_citizens:
                effective_age = max(effective_age, 65)  # Assuming 65 as average senior citizen age
            
            if effective_age < 30:
                base_premium = sum_insured_value * 0.025
            elif effective_age < 45:
                base_premium = sum_insured_value * 0.03
            elif effective_age < 60:
                base_premium = sum_insured_value * 0.04
            else:
                base_premium = sum_insured_value * 0.06
            
            # Family size multiplier
            family_factor = 1 + (0.2 * (family_size - 1))  # 20% increase per additional family member
            base_premium *= family_factor
            
        elif policy_type == "Senior Citizen":
            # Base premium for senior citizen policy
            base_premium = sum_insured_value * 0.06
            
            # Age factor for senior citizens
            age_factor = 1 + ((age - 60) * 0.02)  # 2% increase per year above 60
            base_premium *= max(1, age_factor)
            
        else:  # Critical Illness
            # Base premium for critical illness policy
            base_premium = sum_insured_value * 0.045
            
            # Age factor for critical illness
            age_factor = 1 + (age / 80)
            base_premium *= age_factor
        
        # Adjustments based on health conditions
        health_conditions_factor = 1.0
        if "None" not in pre_existing_diseases:
            # Add 10% for each condition
            health_conditions_factor += (len(pre_existing_diseases) * 0.1)
        
        # Smoking adjustments
        smoking_factor = 1.0
        if smoking_status == "Occasional":
            smoking_factor = 1.15  # 15% increase
        elif smoking_status == "Regular smoker":
            smoking_factor = 1.3   # 30% increase
        
        # City tier adjustments
        city_factor = 1.0
        if city_tier == "Tier 1 (Metro)":
            city_factor = 1.1  # 10% higher for metro cities
        elif city_tier == "Tier 3 (Semi-urban/Rural)":
            city_factor = 0.9  # 10% lower for tier 3 cities
        
        # Room rent category adjustments
        room_factor = 1.0
        if room_rent_category == "Single Private Room":
            room_factor = 1.1  # 10% increase
        elif room_rent_category == "Any Room (No capping)":
            room_factor = 1.2  # 20% increase
        elif room_rent_category == "Shared Room":
            room_factor = 0.95  # 5% decrease
        
        # Additional coverages
        additional_cover_factor = 1.0
        if restore_benefit:
            additional_cover_factor += 0.05  # 5% increase
        if no_claim_bonus:
            additional_cover_factor += 0.03  # 3% increase
        if annual_health_checkup:
            additional_cover_factor += 0.02  # 2% increase
        if daily_hospital_cash:
            additional_cover_factor += 0.07  # 7% increase
        if critical_illness_cover:
            additional_cover_factor += 0.1   # 10% increase
        if personal_accident_cover:
            additional_cover_factor += 0.08  # 8% increase
        if maternity_coverage:
            additional_cover_factor += 0.15  # 15% increase
        
        # Calculate final premium
        final_premium = base_premium * health_conditions_factor * smoking_factor * city_factor * room_factor * additional_cover_factor
        
        # Discount calculations
        discount = 0
        discount_reasons = []
        
        # Discount for young age
        if age < 25 and "Senior Citizen" not in policy_type:
            discount += 0.05
            discount_reasons.append("Young Age Discount: 5%")
        
        # Discount for high sum insured
        if sum_insured_value >= 2000000:  # 20 lakhs or above
            discount += 0.08
            discount_reasons.append("High Sum Insured Discount: 8%")
        
        # Long-term policy discount (assuming 3-year policy)
        long_term_policy = st.session_state.get('long_term_policy', False)
        if long_term_policy:
            discount += 0.15
            discount_reasons.append("Long-term (3-year) Policy Discount: 15%")
        
        # Apply discount
        if discount > 0:
            final_premium = final_premium * (1 - discount)
        
        # Calculate monthly premium
        monthly_premium = final_premium / 12
        
        # Display premium details
        st.subheader("💰 Premium Calculation Results")
        
        col1, col2, col3 = st.columns(3)
        with col1:
            st.metric(
                "Annual Premium",
                f"₹{final_premium:,.2f}",
                help="Total premium payable for the year"
            )
        with col2:
            st.metric(
                "Monthly Premium Equivalent",
                f"₹{monthly_premium:,.2f}",
                help="Monthly payment if premium is spread across the year"
            )
        with col3:
            coverage_ratio = sum_insured_value / final_premium
            st.metric(
                "Coverage Ratio",
                f"{coverage_ratio:.2f}x",
                help="Sum insured divided by annual premium - higher is better"
            )
        
        # Premium breakup in a pie chart
        st.subheader("Premium Breakup")
        
        # Creating premium breakup for visualization
        breakup_labels = ["Base Premium"]
        breakup_values = [base_premium]
        
        # Health condition loading
        if health_conditions_factor > 1:
            health_loading = base_premium * (health_conditions_factor - 1)
            breakup_labels.append("Health Loading")
            breakup_values.append(health_loading)
        
        # Smoking loading
        if smoking_factor > 1:
            smoking_loading = base_premium * (smoking_factor - 1)
            breakup_labels.append("Lifestyle Loading")
            breakup_values.append(smoking_loading)
        
        # Additional covers
        if additional_cover_factor > 1:
            addon_premium = base_premium * (additional_cover_factor - 1)
            breakup_labels.append("Additional Covers")
            breakup_values.append(addon_premium)
        
        # Discount
        if discount > 0:
            discount_amount = base_premium * discount
            breakup_labels.append("Discounts")
            breakup_values.append(-discount_amount)
        
        # Create pie chart
        fig = go.Figure(
            data=[
                go.Pie(
                    labels=breakup_labels,
                    values=breakup_values,
                    hole=0.4
                )
            ]
        )
        fig.update_layout(title_text="Premium Components")
        st.plotly_chart(fig, use_container_width=True)
        
        # Discount details if applicable
        if discount > 0:
            st.success(f"""
            ### 🎉 Applied Discounts
            {" ".join(discount_reasons)}
            Total Discount: {discount*100:.0f}%
            """)
        
        # Coverage details
        st.subheader("📋 Coverage Details")
        
        coverage_details = {
            "Coverage": [
                "Hospitalization Expenses",
                "Pre & Post Hospitalization",
                "ICU Charges",
                "Ambulance Charges",
                "Daycare Procedures",
                "Ayush Treatment",
                "Organ Donor Expenses"
            ],
            "Coverage Limit": [
                f"Up to {sum_insured}",
                "30 days pre & 60 days post",
                f"Up to {sum_insured}",
                "₹2,000 per hospitalization",
                "All daycare procedures covered",
                f"Up to {sum_insured}",
                "As per actual medical expenses"
            ],
            "Waiting Period": [
                "None",
                "None",
                "None",
                "None",
                "None", 
                "None",
                "None"
            ]
        }
        
        # Add pre-existing diseases waiting period
        if "None" not in pre_existing_diseases:
            coverage_details["Coverage"].append("Pre-existing Diseases")
            coverage_details["Coverage Limit"].append(f"Up to {sum_insured}")
            coverage_details["Waiting Period"].append("3-4 years")
        
        # Add maternity if selected
        if maternity_coverage:
            coverage_details["Coverage"].append("Maternity Benefits")
            coverage_details["Coverage Limit"].append("Up to ₹50,000")
            coverage_details["Waiting Period"].append("2-4 years")
        
        coverage_df = pd.DataFrame(coverage_details)
        st.table(coverage_df)
        
        # Health insurance tips
        st.info("""
        ### 💡 Health Insurance Tips
        
        1. **Consider co-payment options** to reduce premium further
        
        2. **Opt for a higher deductible** if you can afford initial expenses out of pocket
        
        3. **Choose family floater policies** for better value with multiple family members
        
        4. **Disclose all pre-existing conditions** to avoid claim rejection later
        
        5. **Review sub-limits and room rent capping** to avoid surprise out-of-pocket expenses
        
        6. **Consider critical illness as a separate policy** rather than a rider for better coverage
        """)
        
        # Insurance comparison
        st.subheader("🏥 Health Insurance Comparison")
        
        health_insurers_data = {
            "Insurer": [
                "Star Health Insurance",
                "HDFC ERGO Health",
                "Bajaj Allianz",
                "ICICI Lombard",
                "Max Bupa Health",
                "Aditya Birla Health",
                "Care Health Insurance",
                "Niva Bupa (formerly known as Max Bupa)"
            ],
            "No-Claim Bonus": [
                "Up to 100%",
                "Up to 50%",
                "Up to 50%",
                "Up to 50%",
                "Up to 100%",
                "Up to 200%",
                "Up to 50%",
                "Up to 150%"
            ],
            "Pre-Existing Disease Waiting": [
                "3 years",
                "3 years",
                "4 years",
                "3 years",
                "2 years",
                "3 years",
                "4 years",
                "2 years"
            ],
            "Free Health Checkup": [
                "Every year",
                "Every claim-free year",
                "Every claim-free year",
                "Every 2 claim-free years",
                "Every year",
                "Every year (comprehensive)",
                "Every claim-free year",
                "Every year"
            ]
        }
        
        health_insurers_df = pd.DataFrame(health_insurers_data)
        st.table(health_insurers_df)

# GST Calculator
def show_gst_calculator():
    st.header("GST Calculator")
    st.write("""
    Calculate Goods and Services Tax (GST) for your purchases and sales. This calculator helps you understand 
    how GST affects the final price of products and services in India.
    """)
    
    calculation_type = st.radio(
        "Calculation Type",
        ["Add GST to Base Price", "Extract GST from Total Price"]
    )
    
    col1, col2 = st.columns(2)
    with col1:
        if calculation_type == "Add GST to Base Price":
            base_amount = st.number_input(
                "Base Amount (₹)",
                min_value=0.0,
                value=1000.0,
                step=100.0
            )
        else:
            total_amount = st.number_input(
                "Total Amount (₹)",
                min_value=0.0,
                value=1180.0,
                step=100.0
            )
    
    with col2:
        gst_rate = st.selectbox(
            "GST Rate (%)",
            [0, 0.1, 0.25, 3, 5, 12, 18, 28],
            index=5
        )
        
    # Option to split into CGST and SGST
    show_split = st.checkbox("Show CGST & SGST Split", value=True)
    
    # Option to include HSN/SAC codes reference
    show_hsn = st.checkbox("Show HSN/SAC Code Reference", value=True)
    
    if st.button("Calculate GST", use_container_width=True):
        if calculation_type == "Add GST to Base Price":
            # Calculate GST amount and total
            gst_amount = base_amount * (gst_rate / 100)
            total_amount = base_amount + gst_amount
            
            # Display results
            st.subheader("📊 GST Calculation Results")
            
            col1, col2, col3 = st.columns(3)
            with col1:
                st.metric(
                    "Base Amount",
                    f"₹{base_amount:,.2f}"
                )
            with col2:
                st.metric(
                    f"GST ({gst_rate}%)",
                    f"₹{gst_amount:,.2f}"
                )
            with col3:
                st.metric(
                    "Total Amount",
                    f"₹{total_amount:,.2f}"
                )
                
            # Show CGST and SGST breakdown if selected
            if show_split:
                st.subheader("CGST & SGST Breakdown")
                
                cgst_sgst_rate = gst_rate / 2
                cgst_sgst_amount = gst_amount / 2
                
                col1, col2 = st.columns(2)
                with col1:
                    st.metric(
                        f"CGST ({cgst_sgst_rate}%)",
                        f"₹{cgst_sgst_amount:,.2f}"
                    )
                with col2:
                    st.metric(
                        f"SGST ({cgst_sgst_rate}%)",
                        f"₹{cgst_sgst_amount:,.2f}"
                    )
        
        else:
            # Extract GST from total amount
            base_amount = total_amount / (1 + (gst_rate / 100))
            gst_amount = total_amount - base_amount
            
            # Display results
            st.subheader("📊 GST Extraction Results")
            
            col1, col2, col3 = st.columns(3)
            with col1:
                st.metric(
                    "Base Amount",
                    f"₹{base_amount:,.2f}"
                )
            with col2:
                st.metric(
                    f"GST ({gst_rate}%)",
                    f"₹{gst_amount:,.2f}"
                )
            with col3:
                st.metric(
                    "Total Amount",
                    f"₹{total_amount:,.2f}"
                )
                
            # Show CGST and SGST breakdown if selected
            if show_split:
                st.subheader("CGST & SGST Breakdown")
                
                cgst_sgst_rate = gst_rate / 2
                cgst_sgst_amount = gst_amount / 2
                
                col1, col2 = st.columns(2)
                with col1:
                    st.metric(
                        f"CGST ({cgst_sgst_rate}%)",
                        f"₹{cgst_sgst_amount:,.2f}"
                    )
                with col2:
                    st.metric(
                        f"SGST ({cgst_sgst_rate}%)",
                        f"₹{cgst_sgst_amount:,.2f}"
                    )
        
        # Visualization
        st.subheader("Price Breakdown")
        
        # Create pie chart showing breakdown
        fig = px.pie(
            values=[base_amount, gst_amount],
            names=["Base Amount", f"GST ({gst_rate}%)"],
            title="Price Breakdown",
            color_discrete_sequence=["#636EFA", "#EF553B"]
        )
        
        # Add percentage labels
        fig.update_traces(
            textposition='inside',
            textinfo='percent+label'
        )
        
        st.plotly_chart(fig, use_container_width=True)
        
        # GST insights and information
        st.subheader("💡 GST Insights")
        
        # GST category information based on rate
        if gst_rate == 0:
            st.info("""
            **GST Exempt (0%):**
            - Fresh fruits and vegetables, milk, eggs, curd, buttermilk, and natural honey
            - Education services, healthcare services, and basic agricultural services
            """)
        elif gst_rate == 5:
            st.info("""
            **5% GST Category:**
            - Household necessities like sugar, tea, coffee, edible oils
            - Coal, cashew nuts, raisins, and packaged food items
            - Transport services and economy class air tickets
            """)
        elif gst_rate == 12:
            st.info("""
            **12% GST Category:**
            - Processed food items, butter, ghee, and almonds
            - Mobile phones, computers, and specific electronic items
            - Business class air tickets and hotel accommodation
            """)
        elif gst_rate == 18:
            st.info("""
            **18% GST Category:**
            - Most electronic products and household appliances
            - Restaurant dining, outdoor catering services
            - Financial and insurance services
            - Most standard services including software
            """)
        elif gst_rate == 28:
            st.info("""
            **28% GST Category (Luxury and Sin Goods):**
            - Luxury cars, motorcycles, and personal aircraft
            - Tobacco products, pan masala, and aerated drinks
            - Gambling and betting services
            - Premium consumer durables
            """)
        else:
            st.info(f"""
            **Special {gst_rate}% GST Rate:**
            This appears to be a special rate. Standard GST rates in India are 0%, 5%, 12%, 18%, and 28%.
            Some special cases have rates like 0.1%, 0.25%, or 3%.
            """)
        
        # Input credit information for businesses
        st.write("""
        **GST Input Credit (for Businesses):**
        - Businesses can claim input tax credit for GST paid on purchases used in the course of business
        - This helps avoid cascading of taxes (tax on tax)
        - Proper documentation including valid tax invoices is essential for claiming input credit
        """)
        
        # If user selected to show HSN codes
        if show_hsn:
            st.subheader("HSN/SAC Code Reference")
            st.write("""
            HSN (Harmonized System of Nomenclature) codes are used for goods and SAC (Services Accounting Codes) 
            are used for services under the GST system. These codes help in standardized classification.
            """)
            
            if gst_rate == 5:
                st.info("""
                **Sample HSN Codes for 5% GST:**
                - 0401: Milk and cream, not concentrated
                - 0901: Coffee, whether or not roasted
                - 0902: Tea, whether or not flavored
                - 1701: Cane or beet sugar and chemically pure sucrose
                """)
            elif gst_rate == 12:
                st.info("""
                **Sample HSN Codes for 12% GST:**
                - 8517: Telephones for cellular networks (mobile phones)
                - 0405: Butter and other fats derived from milk
                - 6211: Track suits, ski suits and swimwear
                - 4819: Cartons, boxes of paper and paperboard
                """)
            elif gst_rate == 18:
                st.info("""
                **Sample HSN Codes for 18% GST:**
                - 8415: Air conditioning machines
                - 8508: Vacuum cleaners
                - 8516: Electric water heaters and immersion heaters
                - 9971: Financial and related services
                """)
            elif gst_rate == 28:
                st.info("""
                **Sample HSN Codes for 28% GST:**
                - 8703: Motor cars and other motor vehicles
                - 2202: Waters, including mineral waters, with added sugar
                - 2203: Beer made from malt
                - 8711: Motorcycles with engine capacity > 350cc
                """)

# Inflation Calculator
def show_inflation_calculator():
    st.header("Inflation Calculator")
    st.write("""
    Calculate how inflation affects the value of money over time. This calculator helps you understand the impact of inflation on 
    your purchasing power and plan for future expenses.
    """)
    
    # Current year for reference
    current_year = 2025
    
    col1, col2 = st.columns(2)
    with col1:
        amount = st.number_input(
            "Amount (₹)",
            min_value=1,
            value=10000,
            step=1000
        )
        start_year = st.number_input(
            "Start Year",
            min_value=1950,
            max_value=current_year,
            value=current_year,
            step=1
        )
    
    with col2:
        end_year = st.number_input(
            "End Year",
            min_value=start_year,
            max_value=current_year + 50,
            value=current_year + 10,
            step=1
        )
        inflation_rate = st.number_input(
            "Annual Inflation Rate (%)",
            min_value=0.1,
            max_value=30.0,
            value=6.0,
            step=0.1
        )
    
    direction = st.radio(
        "Calculation Direction",
        ["Future Value (How much will it cost in the future?)", "Past Value (What was it worth in the past?)"]
    )
    
    if st.button("Calculate", use_container_width=True):
        num_years = abs(end_year - start_year)
        inflation_decimal = inflation_rate / 100
        
        if direction == "Future Value (How much will it cost in the future?)":
            # Calculate future value
            future_value = amount * (1 + inflation_decimal) ** num_years
            purchasing_power = amount / future_value * 100
            
            # Display results
            st.subheader("📊 Inflation Impact Analysis")
            
            col1, col2, col3 = st.columns(3)
            with col1:
                st.metric(
                    f"Value in {start_year}",
                    f"₹{amount:,.2f}"
                )
            with col2:
                st.metric(
                    f"Value in {end_year}",
                    f"₹{future_value:,.2f}",
                    f"+₹{future_value - amount:,.2f}",
                    delta_color="normal"  # Positive change in green (default)
                )
            with col3:
                st.metric(
                    "Purchasing Power Remaining",
                    f"{purchasing_power:.2f}%",
                    f"-{100 - purchasing_power:.2f}%",
                    delta_color="normal"  # Negative change in red
                )
            
            # Additional context
            st.info(f"""
            **What this means:**
            - An item that costs ₹{amount:,.2f} in {start_year} would cost approximately ₹{future_value:,.2f} in {end_year}
            - This represents a {future_value/amount:.2f}x increase in price over {num_years} years
            - Your purchasing power will decrease by {100 - purchasing_power:.2f}% over this period
            """)
            
        else:
            # Calculate past value
            past_value = amount / (1 + inflation_decimal) ** num_years
            purchasing_power = past_value / amount * 100
            
            # Display results
            st.subheader("📊 Inflation Impact Analysis")
            
            col1, col2, col3 = st.columns(3)
            with col1:
                st.metric(
                    f"Value in {end_year}",
                    f"₹{amount:,.2f}"
                )
            with col2:
                st.metric(
                    f"Equivalent Value in {start_year}",
                    f"₹{past_value:,.2f}",
                    f"-₹{amount - past_value:,.2f}",
                    delta_color="normal"  # Negative value in red
                )
            with col3:
                st.metric(
                    "Relative Purchasing Power",
                    f"{100/purchasing_power:.2f}x"
                )
            
            # Additional context
            st.info(f"""
            **What this means:**
            - ₹{amount:,.2f} in {end_year} had the same purchasing power as ₹{past_value:,.2f} in {start_year}
            - This means prices have increased by approximately {amount/past_value:.2f}x over {num_years} years
            - ₹1 in {start_year} would be worth about ₹{amount/past_value:.2f} in {end_year}
            """)
        
        # Visualization of inflation impact
        st.subheader("Inflation Impact Over Time")
        
        # Generate year-by-year data
        years = list(range(start_year, end_year + 1))
        values = []
        
        if direction == "Future Value (How much will it cost in the future?)":
            for i, year in enumerate(years):
                values.append(amount * (1 + inflation_decimal) ** i)
        else:
            # For past values, we need to work backward from the end amount
            for i, year in enumerate(range(end_year, start_year - 1, -1)):
                values.append(amount / (1 + inflation_decimal) ** i)
            values.reverse()
            
        # Create dataframe for visualization
        df = pd.DataFrame({
            'Year': years,
            'Value': values
        })
        
        # Plot
        fig = px.line(
            df,
            x='Year',
            y='Value',
            title=f'Impact of {inflation_rate}% Annual Inflation Rate',
            labels={'Value': 'Amount (₹)'}
        )
        
        # Add initial and final points with annotations
        fig.add_scatter(
            x=[years[0], years[-1]],
            y=[values[0], values[-1]],
            mode='markers',
            marker=dict(size=10, color='red'),
            name='Start/End Points',
            showlegend=False
        )
        
        fig.add_annotation(
            x=years[0],
            y=values[0],
            text=f"₹{values[0]:,.0f}",
            showarrow=True,
            arrowhead=1,
            yshift=10
        )
        
        fig.add_annotation(
            x=years[-1],
            y=values[-1],
            text=f"₹{values[-1]:,.0f}",
            showarrow=True,
            arrowhead=1,
            yshift=10
        )
        
        st.plotly_chart(fig, use_container_width=True)
        
        # Common purchases comparison
        st.subheader("💡 Purchasing Power Comparison")
        
        common_items = [
            {"name": "Movie Ticket", "price": 300},
            {"name": "Restaurant Meal", "price": 1000},
            {"name": "Smartphone", "price": 15000},
            {"name": "Monthly Rent", "price": 20000},
            {"name": "Family Car", "price": 800000}
        ]
        
        item_data = []
        if direction == "Future Value (How much will it cost in the future?)":
            for item in common_items:
                future_price = item["price"] * (1 + inflation_decimal) ** num_years
                item_data.append({
                    "Item": item["name"],
                    f"Price in {start_year}": f"₹{item['price']:,.0f}",
                    f"Estimated Price in {end_year}": f"₹{future_price:,.0f}",
                    "Increase": f"₹{future_price - item['price']:,.0f}"
                })
        else:
            for item in common_items:
                past_price = item["price"] / (1 + inflation_decimal) ** num_years
                item_data.append({
                    "Item": item["name"],
                    f"Price in {end_year}": f"₹{item['price']:,.0f}",
                    f"Equivalent Price in {start_year}": f"₹{past_price:,.0f}",
                    "Difference": f"₹{item['price'] - past_price:,.0f}"
                })
        
        # Show the comparison table
        st.dataframe(pd.DataFrame(item_data))
        
        # Inflation insights
        st.subheader("Inflation Insights")
        
        # Historical context
        st.write("""
        **Historical Indian Inflation Context:**
        - Average inflation in India over the past 10 years: ~5-6%
        - High inflation periods: 2010-2013 (~10%)
        - Low inflation periods: 2018-2020 (~4%)
        """)
        
        # Strategies to combat inflation
        st.write("""
        **Strategies to Combat Inflation:**
        1. **Invest in growth assets** like stocks and equity mutual funds
        2. **Consider real estate** as a long-term inflation hedge
        3. **Diversify with gold** which traditionally performs well during high inflation
        4. **Regularly review and adjust your investment portfolio** to ensure it outpaces inflation
        5. **Ensure your income growth** keeps pace with or exceeds inflation
        """)
        
        # Inflation and retirement planning
        if num_years > 15:
            retirement_multiple = (1 + inflation_decimal) ** 30
            st.warning(f"""
            **Inflation and Retirement Planning:**
            At {inflation_rate}% annual inflation, your retirement corpus needs to be approximately {retirement_multiple:.2f}x
            larger than what you might expect based on today's expenses. Don't underestimate the long-term impact of inflation
            on your retirement savings!
            """)

# Interest Rate Calculator
def show_interest_rate_calculator():
    st.header("Interest Rate Calculator")
    st.write("""
    Calculate the effective interest rate required to achieve a specific future value from a known principal amount 
    over a given time period. This calculator helps you determine what rate of return you need to target to meet your financial goals.
    """)
    
    col1, col2 = st.columns(2)
    with col1:
        principal = st.number_input(
            "Initial Investment/Principal (₹)",
            min_value=100,
            value=100000,
            step=1000
        )
        future_value = st.number_input(
            "Target Future Value (₹)",
            min_value=100,
            value=150000,
            step=1000
        )
    
    with col2:
        time_period = st.number_input(
            "Time Period (Years)",
            min_value=1,
            value=5,
            step=1
        )
        compounding_frequency = st.selectbox(
            "Compounding Frequency",
            ["Annually (1/year)", "Semi-annually (2/year)", "Quarterly (4/year)", "Monthly (12/year)", "Daily (365/year)"],
            index=0
        )
    
    # Map compounding frequency selection to actual number
    frequency_map = {
        "Annually (1/year)": 1,
        "Semi-annually (2/year)": 2,
        "Quarterly (4/year)": 4,
        "Monthly (12/year)": 12,
        "Daily (365/year)": 365
    }
    
    frequency = frequency_map[compounding_frequency]
    
    if st.button("Calculate Interest Rate", use_container_width=True):
        # Calculate required interest rate
        # Formula: r = (FV/PV)^(1/(t*n)) - 1, where r is rate per period, n is periods per year
        try:
            # Calculate rate per period
            rate_per_period = (future_value / principal) ** (1 / (time_period * frequency)) - 1
            
            # Convert to annual rate
            annual_rate = rate_per_period * frequency * 100
            
            # Display results
            st.subheader("📊 Interest Rate Analysis")
            
            st.metric(
                "Required Annual Interest Rate",
                f"{annual_rate:.2f}%"
            )
            
            # Additional metrics
            col1, col2, col3 = st.columns(3)
            with col1:
                st.metric(
                    "Rate per Period",
                    f"{(rate_per_period * 100):.4f}%"
                )
            with col2:
                total_interest = future_value - principal
                st.metric(
                    "Total Interest",
                    f"₹{total_interest:,.2f}"
                )
            with col3:
                st.metric(
                    "Interest % of Principal",
                    f"{(total_interest / principal * 100):.2f}%"
                )
            
            # Visualization of growth
            st.subheader("Growth Visualization")
            
            # Generate data for visualization
            periods = range(0, time_period * frequency + 1)
            values = [principal * (1 + rate_per_period) ** period for period in periods]
            
            # Create dataframe for plotting
            period_labels = []
            for p in periods:
                if frequency == 1:
                    # For annual compounding, show years
                    period_labels.append(f"Year {p}")
                elif frequency == 12:
                    # For monthly compounding, show months
                    years = p // 12
                    months = p % 12
                    if months == 0:
                        period_labels.append(f"Year {years}")
                    else:
                        period_labels.append(f"Year {years}, Month {months}")
                else:
                    # For other frequencies, show periods
                    period_labels.append(f"Period {p}")
            
            df = pd.DataFrame({
                'Period': period_labels,
                'Value': values,
                'Period_Num': periods
            })
            
            # Create line chart
            fig = px.line(
                df,
                x='Period_Num',
                y='Value',
                title=f'Investment Growth at {annual_rate:.2f}% Annual Rate',
                labels={'Value': 'Amount (₹)', 'Period_Num': 'Period'}
            )
            
            # Add markers for start and end points
            fig.add_scatter(
                x=[0, time_period * frequency],
                y=[principal, future_value],
                mode='markers',
                marker=dict(size=10, color='red'),
                name='Start/End Points',
                showlegend=False
            )
            
            # Add annotations
            fig.add_annotation(
                x=0, y=principal,
                text=f"Principal: ₹{principal:,.0f}",
                showarrow=True,
                arrowhead=1,
                yshift=10
            )
            
            fig.add_annotation(
                x=time_period * frequency, y=future_value,
                text=f"Future Value: ₹{future_value:,.0f}",
                showarrow=True,
                arrowhead=1,
                yshift=10
            )
            
            st.plotly_chart(fig, use_container_width=True)
            
            # Comparable investments
            st.subheader("Comparable Investment Options")
            st.write("Here are some common investment options and their typical returns:")
            
            # Define common investment options and their typical returns
            investment_options = {
                "Savings Account": 3.5,
                "Fixed Deposit": 6.0,
                "PPF": 7.1,
                "Govt Bonds": 7.5,
                "Corporate Bonds": 8.0,
                "Debt Mutual Funds": 8.5,
                "Hybrid Mutual Funds": 10.0,
                "Equity Mutual Funds": 12.0,
                "Direct Equity/Stocks": 15.0
            }
            
            # Create a comparison table
            comparison_data = []
            for investment, typical_return in investment_options.items():
                comparison_data.append({
                    "Investment Option": investment,
                    "Typical Annual Return": f"{typical_return:.2f}%",
                    "Comparison": f"{typical_return - annual_rate:.2f}%",
                    "Assessment": "Higher" if typical_return > annual_rate else "Lower",
                    "Difference": typical_return - annual_rate
                })
            
            comparison_df = pd.DataFrame(comparison_data)
            
            # Display comparison table
            st.dataframe(comparison_df[["Investment Option", "Typical Annual Return", "Comparison", "Assessment"]])
            
            # Add insights based on the required rate
            st.subheader("💡 Insights")
            
            if annual_rate < 4:
                st.success("""
                **Low Required Rate:** The interest rate you need is achievable through most investment options, including relatively safe ones like fixed deposits.
                """)
            elif annual_rate < 8:
                st.info("""
                **Moderate Required Rate:** This rate is typically achievable through fixed income securities like government bonds, PPF, or debt mutual funds with moderate risk.
                """)
            elif annual_rate < 12:
                st.warning("""
                **Moderately High Rate:** Achieving this rate typically requires some exposure to equity markets through hybrid funds or carefully selected debt instruments.
                """)
            elif annual_rate < 15:
                st.warning("""
                **High Required Rate:** This rate generally requires significant equity exposure through equity mutual funds or a diversified stock portfolio.
                """)
            else:
                st.error("""
                **Very High Required Rate:** This rate exceeds typical market returns and may be difficult to achieve consistently.
                Consider:
                - Extending your time horizon
                - Increasing your initial investment
                - Adjusting your target future value to a more realistic level
                """)
            
            # Important considerations
            st.write("""
            **Important Considerations:**
            - Past performance is not indicative of future results
            - Higher returns generally come with higher risk
            - Diversification is key to managing investment risk
            - Consult with a financial advisor for personalized investment advice
            """)
            
        except Exception as e:
            st.error(f"""
            Error calculating the interest rate. This could be due to:
            - Future value being less than principal (negative return)
            - Values creating a mathematically impossible situation
            
            Please check your inputs and try again.
            """)
            st.error(f"Technical details: {str(e)}")

# Gold Investment Calculator
def show_gold_investment_calculator():
    """Show the gold investment calculator interface with Indian gold investment options"""
    st.header("Gold Investment Calculator 💍")
    st.write("""
    Calculate returns on your gold investments and compare them with other investment options.
    Understand how gold can be part of your portfolio strategy with this comprehensive calculator.
    """)
    
    st.warning("""
    **Disclaimer:** Gold prices are subject to market fluctuations, geopolitical factors, and currency movements.
    Past performance does not guarantee future results. This calculator provides estimates based on historical data
    and should not be considered financial advice.
    """)
    
    # Investment selection
    st.subheader("💰 Gold Investment Details")
    col1, col2 = st.columns(2)
    with col1:
        investment_type = st.selectbox(
            "Gold Investment Type",
            [
                "Physical Gold (Coins/Bars)",
                "Gold ETFs",
                "Sovereign Gold Bonds (SGBs)", 
                "Digital Gold",
                "Gold Mutual Funds"
            ],
            index=2,
            help="Different types of gold investments have different costs, returns and tax implications"
        )
        
        gold_purity = "24K (99.9%)"
        if investment_type == "Physical Gold (Coins/Bars)":
            gold_purity = st.selectbox(
                "Gold Purity",
                ["24K (99.9%)", "22K (91.6%)", "18K (75%)"],
                index=0,
                help="Purity affects the price and resale value"
            )
            
        investment_amount = st.number_input(
            "Investment Amount (₹)",
            min_value=1000,
            max_value=10000000,
            value=100000,
            step=1000,
            help="Amount you plan to invest in gold"
        )
    
    with col2:
        gold_price_per_gram = st.number_input(
            "Current Gold Price (₹/gram)",
            min_value=3000,
            max_value=10000,
            value=6750,  # Average price as of 2025
            step=10,
            help="Current 24K gold price per gram in ₹"
        )
        
        investment_horizon = st.slider(
            "Investment Horizon (Years)",
            min_value=1,
            max_value=15,
            value=5,
            help="How long you plan to hold your gold investment"
        )
        
        buying_charges = 0.0
        if investment_type == "Physical Gold (Coins/Bars)":
            buying_charges = st.slider(
                "Making Charges (%)",
                min_value=0.0,
                max_value=15.0,
                value=7.0,
                step=0.1,
                help="Making charges applied when buying physical gold"
            )
        elif investment_type == "Gold ETFs":
            buying_charges = st.slider(
                "Expense Ratio (%)",
                min_value=0.0,
                max_value=2.0,
                value=0.5,
                step=0.01,
                help="Annual expense ratio charged by the ETF"
            )
        elif investment_type == "Digital Gold":
            buying_charges = st.slider(
                "Platform Charges (%)",
                min_value=0.0,
                max_value=5.0,
                value=2.0,
                step=0.1,
                help="Charges applied by digital gold platforms"
            )
        elif investment_type == "Gold Mutual Funds":
            buying_charges = st.slider(
                "Expense Ratio (%)",
                min_value=0.0,
                max_value=2.5,
                value=1.0,
                step=0.01,
                help="Annual expense ratio charged by the mutual fund"
            )
    
    # Gold price projections
    with st.expander("🔮 Gold Price Projection Settings"):
        col1, col2 = st.columns(2)
        with col1:
            historical_annual_return = st.slider(
                "Historical Annual Return (%)",
                min_value=0.0,
                max_value=20.0,
                value=9.0,  # Long term gold returns in India
                step=0.1,
                help="Based on gold's historical performance over last 20 years"
            )
            
            expected_annual_return = st.slider(
                "Expected Annual Return (%)",
                min_value=0.0,
                max_value=20.0,
                value=8.0,
                step=0.1,
                help="Your expected annual return from gold investments"
            )
        
        with col2:
            storage_cost = 0.0
            if investment_type == "Physical Gold (Coins/Bars)":
                storage_cost = st.slider(
                    "Annual Storage Cost (%)",
                    min_value=0.0,
                    max_value=2.0,
                    value=0.25,
                    step=0.05,
                    help="Cost of storing physical gold safely (locker charges etc.)"
                )
            
            inflation_adjustment = st.checkbox(
                "Adjust Returns for Inflation",
                value=True,
                help="Shows inflation-adjusted real returns"
            )
            
            if inflation_adjustment:
                inflation_rate = st.slider(
                    "Expected Inflation Rate (%)",
                    min_value=2.0,
                    max_value=10.0,
                    value=5.0,
                    step=0.1,
                    help="Projected annual inflation rate"
                )
    
    # Investment comparison
    with st.expander("📊 Compare with Other Investments"):
        col1, col2 = st.columns(2)
        with col1:
            compare_with_fd = st.checkbox(
                "Compare with Fixed Deposit",
                value=True,
                help="Compare gold returns with FD returns"
            )
            
            if compare_with_fd:
                fd_rate = st.slider(
                    "FD Interest Rate (%)",
                    min_value=3.0,
                    max_value=9.0,
                    value=7.0,
                    step=0.1,
                    help="Current FD interest rate offered by banks"
                )
                
            compare_with_equity = st.checkbox(
                "Compare with Equity",
                value=True,
                help="Compare gold returns with equity market returns"
            )
            
            if compare_with_equity:
                equity_return = st.slider(
                    "Expected Equity Return (%)",
                    min_value=5.0,
                    max_value=20.0,
                    value=12.0,
                    step=0.1,
                    help="Expected annual return from equity investments"
                )
        
        with col2:
            compare_with_real_estate = st.checkbox(
                "Compare with Real Estate",
                value=False,
                help="Compare gold returns with real estate returns"
            )
            
            if compare_with_real_estate:
                real_estate_return = st.slider(
                    "Expected Real Estate Return (%)",
                    min_value=3.0,
                    max_value=15.0,
                    value=7.0,
                    step=0.1,
                    help="Expected annual return from real estate investments"
                )
                
            compare_with_bonds = st.checkbox(
                "Compare with Bonds",
                value=False,
                help="Compare gold returns with government bond returns"
            )
            
            if compare_with_bonds:
                bond_yield = st.slider(
                    "Bond Yield (%)",
                    min_value=3.0,
                    max_value=10.0,
                    value=7.25,
                    step=0.05,
                    help="Current government bond yield"
                )
    
    if st.button("Calculate Gold Investment Returns", use_container_width=True):
        # Calculate gold investment metrics
        
        # Adjust gold price for purity if physical gold
        purity_factor = 1.0
        if investment_type == "Physical Gold (Coins/Bars)":
            if gold_purity == "22K (91.6%)":
                purity_factor = 0.916
            elif gold_purity == "18K (75%)":
                purity_factor = 0.75
        
        # Calculate gold quantity in grams
        gold_price_adjusted = gold_price_per_gram * purity_factor
        
        # For physical gold, adjust initial investment for making charges
        effective_investment = investment_amount
        if investment_type == "Physical Gold (Coins/Bars)":
            effective_investment = investment_amount / (1 + buying_charges/100)
        
        gold_quantity = effective_investment / gold_price_adjusted
        
        # Calculate returns based on gold investment type
        annual_return_rate = expected_annual_return / 100
        
        # Additional benefits for Sovereign Gold Bonds
        additional_interest = 0
        if investment_type == "Sovereign Gold Bonds (SGBs)":
            additional_interest = 0.025  # 2.5% annual interest on SGBs
        
        # Calculate future value
        future_gold_price = gold_price_per_gram * (1 + annual_return_rate) ** investment_horizon
        
        # For physical gold and digital gold, reduce returns by storage cost
        storage_cost_factor = 0
        if investment_type == "Physical Gold (Coins/Bars)":
            storage_cost_factor = storage_cost / 100
        
        # For ETFs and Mutual funds, reduce returns by expense ratio
        expense_ratio_factor = 0
        if investment_type in ["Gold ETFs", "Gold Mutual Funds"]:
            expense_ratio_factor = buying_charges / 100  # expense ratio is stored in buying_charges
        
        # Calculate effective return rate after costs
        effective_return_rate = annual_return_rate - storage_cost_factor - expense_ratio_factor + (additional_interest if investment_type == "Sovereign Gold Bonds (SGBs)" else 0)
        
        # Calculate future value
        future_value = investment_amount * (1 + effective_return_rate) ** investment_horizon
        
        # Calculate real (inflation-adjusted) returns if requested
        real_future_value = future_value
        real_cagr = effective_return_rate
        if inflation_adjustment:
            inflation_factor = (1 + inflation_rate/100) ** investment_horizon
            real_future_value = future_value / inflation_factor
            real_cagr = ((real_future_value / investment_amount) ** (1/investment_horizon)) - 1
        
        # Calculate absolute returns
        absolute_returns = future_value - investment_amount
        returns_percentage = (absolute_returns / investment_amount) * 100
        
        # Calculate CAGR
        cagr = ((future_value / investment_amount) ** (1/investment_horizon)) - 1
        
        # Display results
        st.subheader("📊 Gold Investment Analysis")
        
        col1, col2, col3 = st.columns(3)
        with col1:
            st.metric(
                "Gold Quantity",
                f"{gold_quantity:.2f} grams",
                help="Amount of gold you can buy with your investment"
            )
        with col2:
            st.metric(
                "Future Value",
                f"₹{future_value:,.2f}",
                f"{returns_percentage:.1f}%",
                help="Estimated value of your gold investment after the investment horizon"
            )
        with col3:
            st.metric(
                "CAGR",
                f"{cagr*100:.2f}%",
                help="Compound Annual Growth Rate of your gold investment"
            )
        
        # Additional metrics based on investment type
        if investment_type == "Sovereign Gold Bonds (SGBs)":
            st.success("""
            ### 🌟 SGB Benefits
            - Additional 2.5% annual interest on investment amount
            - Capital gains tax exemption if held till maturity (8 years)
            - No GST applicable unlike physical gold
            - Backed by RBI and Government of India
            """)
        
        # Display gold price projection chart
        st.subheader("Gold Price Projection")
        
        # Generate year-by-year data
        years = list(range(investment_horizon + 1))
        gold_values = [investment_amount * (1 + effective_return_rate) ** year for year in years]
        
        if inflation_adjustment:
            inflation_values = [investment_amount * (1 + inflation_rate/100) ** year for year in years]
            real_values = [gold_values[i] / (1 + inflation_rate/100) ** years[i] for i in range(len(years))]
            
            df = pd.DataFrame({
                'Year': years,
                'Gold Value (Nominal)': gold_values,
                'Gold Value (Real)': real_values,
                'Investment with Inflation': inflation_values
            })
            
            fig = px.line(
                df,
                x='Year',
                y=['Gold Value (Nominal)', 'Gold Value (Real)', 'Investment with Inflation'],
                title='Projected Gold Investment Value Over Time',
                labels={'value': 'Amount (₹)', 'variable': 'Type'}
            )
            
        else:
            df = pd.DataFrame({
                'Year': years,
                'Gold Value': gold_values,
                'Initial Investment': [investment_amount] * len(years)
            })
            
            fig = px.line(
                df,
                x='Year',
                y=['Gold Value', 'Initial Investment'],
                title='Projected Gold Investment Value Over Time',
                labels={'value': 'Amount (₹)', 'variable': 'Type'}
            )
            
        st.plotly_chart(fig, use_container_width=True)
        
        # Investment comparison if requested
        comparison_investments = []
        comparison_returns = []
        
        # Add gold investment to comparison
        comparison_investments.append(investment_type)
        comparison_returns.append(cagr * 100)
        
        if compare_with_fd:
            comparison_investments.append("Fixed Deposit")
            comparison_returns.append(fd_rate)
        
        if compare_with_equity:
            comparison_investments.append("Equity Market")
            comparison_returns.append(equity_return)
        
        if compare_with_real_estate:
            comparison_investments.append("Real Estate")
            comparison_returns.append(real_estate_return)
        
        if compare_with_bonds:
            comparison_investments.append("Government Bonds")
            comparison_returns.append(bond_yield)
        
        # If any comparisons are selected, show the comparison chart
        if len(comparison_investments) > 1:
            st.subheader("Investment Comparison")
            
            comparison_df = pd.DataFrame({
                'Investment Type': comparison_investments,
                'Annual Return (%)': comparison_returns
            })
            
            fig = px.bar(
                comparison_df,
                x='Investment Type',
                y='Annual Return (%)',
                title='Expected Annual Returns by Investment Type',
                color='Investment Type',
                text_auto='.2f'
            )
            
            fig.update_layout(xaxis_title="Investment Type", yaxis_title="Expected Annual Return (%)")
            st.plotly_chart(fig, use_container_width=True)
            
            # Show portfolio allocation suggestions based on gold percentage
            st.subheader("💼 Portfolio Allocation Suggestions")
            
            # Different portfolio allocations
            allocations = {
                "Conservative": {"Gold": 15, "Fixed Income": 65, "Equity": 20},
                "Moderate": {"Gold": 10, "Fixed Income": 50, "Equity": 40},
                "Aggressive": {"Gold": 5, "Fixed Income": 25, "Equity": 70}
            }
            
            col1, col2, col3 = st.columns(3)
            for i, (strategy, allocation) in enumerate(allocations.items()):
                fig = go.Figure(data=[
                    go.Pie(
                        labels=list(allocation.keys()),
                        values=list(allocation.values()),
                        hole=0.4
                    )
                ])
                fig.update_layout(title_text=f"{strategy} Portfolio")
                
                if i == 0:
                    with col1:
                        st.plotly_chart(fig, use_container_width=True)
                elif i == 1:
                    with col2:
                        st.plotly_chart(fig, use_container_width=True)
                else:
                    with col3:
                        st.plotly_chart(fig, use_container_width=True)
        
        # Tax implications
        st.subheader("💸 Tax Implications")
        
        tax_info = {
            "Investment Type": [],
            "Short-Term Capital Gains": [],
            "Long-Term Capital Gains": [],
            "Other Taxes": []
        }
        
        tax_info["Investment Type"].append(investment_type)
        
        if investment_type == "Physical Gold (Coins/Bars)":
            tax_info["Short-Term Capital Gains"].append("As per income tax slab")
            tax_info["Long-Term Capital Gains"].append("20% with indexation benefit")
            tax_info["Other Taxes"].append("3% GST on purchase")
        elif investment_type == "Gold ETFs":
            tax_info["Short-Term Capital Gains"].append("As per income tax slab")
            tax_info["Long-Term Capital Gains"].append("20% with indexation benefit")
            tax_info["Other Taxes"].append("None")
        elif investment_type == "Sovereign Gold Bonds (SGBs)":
            tax_info["Short-Term Capital Gains"].append("As per income tax slab")
            tax_info["Long-Term Capital Gains"].append("Exempt if held till maturity")
            tax_info["Other Taxes"].append("Interest taxable as per slab")
        elif investment_type == "Digital Gold":
            tax_info["Short-Term Capital Gains"].append("As per income tax slab")
            tax_info["Long-Term Capital Gains"].append("20% with indexation benefit")
            tax_info["Other Taxes"].append("3% GST on purchase")
        elif investment_type == "Gold Mutual Funds":
            tax_info["Short-Term Capital Gains"].append("As per income tax slab")
            tax_info["Long-Term Capital Gains"].append("20% with indexation benefit")
            tax_info["Other Taxes"].append("None")
        
        tax_df = pd.DataFrame(tax_info)
        st.table(tax_df)
        
        # Gold investment tips
        st.info("""
        ### 💡 Gold Investment Tips
        
        1. **Diversification**: Gold typically has low correlation with other asset classes, making it valuable for portfolio diversification
        
        2. **Hedge against inflation**: Gold has historically been a good hedge against inflation and currency depreciation
        
        3. **SGB advantages**: Sovereign Gold Bonds offer the best overall returns with interest and tax benefits
        
        4. **Best for long-term**: Gold investments perform best over longer time horizons (5+ years)
        
        5. **Avoid physical storage issues**: Consider paper gold (ETFs, SGBs) to avoid storage and security concerns
        
        6. **Dollar-INR impact**: Keep an eye on USD-INR exchange rates as they impact gold prices in India
        """)
        
        # Gold price factors
        with st.expander("📚 Factors Affecting Gold Prices"):
            st.markdown("""
            ### Key Factors That Influence Gold Prices
            
            1. **USD Exchange Rate**: Gold prices in India are heavily influenced by the USD-INR exchange rate
            
            2. **Global Economic Uncertainty**: Gold prices tend to rise during economic uncertainty
            
            3. **Interest Rates**: Lower interest rates generally support gold prices
            
            4. **Inflation**: Higher inflation often leads to higher gold prices
            
            5. **Central Bank Reserves**: Purchases by central banks can drive gold prices
            
            6. **Seasonal Demand**: Festival and wedding seasons in India drive up local demand
            
            7. **Import Duties**: Changes in gold import duties affect local prices
            
            8. **Geopolitical Tensions**: International conflicts often push gold prices higher
            """)
        
        # Gold purity chart if physical gold is selected
        if investment_type == "Physical Gold (Coins/Bars)":
            with st.expander("🔍 Gold Purity Guide"):
                st.markdown("""
                ### Gold Purity Standards
                
                | Karat | Purity % | Typical Use |
                |-------|----------|-------------|
                | 24K   | 99.9%    | Coins, bars, investments |
                | 22K   | 91.6%    | Jewelry, coins |
                | 18K   | 75%      | Jewelry, often with gemstones |
                | 14K   | 58.3%    | Everyday jewelry |
                
                **Gold Hallmark Symbols in India:**
                - BIS Standard Mark
                - Purity grade
                - Assay center's identification mark
                - Jeweler's identification mark
                - Year of marking
                """)

# Stock Average Calculator
def show_stock_average_calculator():
    """Show the stock average calculator for calculating average purchase price"""
    st.header("Stock Average Calculator 📈")
    st.write("""
    Calculate your average purchase price and track your stock portfolio performance with this
    comprehensive stock averaging calculator. Understand the impact of buying additional shares
    on your overall investment.
    """)
    
    st.warning("""
    **Disclaimer:** Stock market investments are subject to market risks. Past performance is not
    indicative of future results. This calculator is meant for educational purposes only and should
    not be considered as investment advice.
    """)
    
    # Initialize session state for stock entries
    if 'stock_entries' not in st.session_state:
        st.session_state.stock_entries = [
            {"quantity": 10, "price": 500, "date": "2025-01-15"}
        ]
    
    if 'deleted_entries' not in st.session_state:
        st.session_state.deleted_entries = []
    
    # Stock details
    st.subheader("📋 Stock Details")
    
    # Stock name and current price
    col1, col2 = st.columns(2)
    with col1:
        stock_name = st.text_input(
            "Stock Name/Symbol",
            value="HDFCBANK",
            help="Enter the name or symbol of the stock"
        )
    
    with col2:
        current_price = st.number_input(
            "Current Market Price (₹)",
            min_value=0.0,
            value=1650.0,
            step=0.5,
            help="Current market price of the stock"
        )
    
    # Purchase entries section
    st.subheader("🛒 Purchase Entries")
    
    # Function to add a new entry
    def add_entry():
        st.session_state.stock_entries.append(
            {"quantity": 0, "price": 0.0, "date": datetime.now().strftime("%Y-%m-%d")}
        )
    
    # Function to delete an entry
    def delete_entry(index):
        if len(st.session_state.stock_entries) > 1:  # Ensure at least one entry remains
            st.session_state.deleted_entries.append(st.session_state.stock_entries.pop(index))
    
    # Function to reset entries
    def reset_entries():
        st.session_state.stock_entries = [
            {"quantity": 10, "price": 500, "date": "2025-01-15"}
        ]
        st.session_state.deleted_entries = []
    
    # Buttons to add and reset entries
    col1, col2 = st.columns(2)
    with col1:
        st.button("➕ Add Purchase Entry", on_click=add_entry, use_container_width=True)
    with col2:
        st.button("🔄 Reset All Entries", on_click=reset_entries, use_container_width=True)
    
    # Display entry fields
    total_investment = 0
    total_shares = 0
    purchase_data = []
    
    for i, entry in enumerate(st.session_state.stock_entries):
        col1, col2, col3, col4 = st.columns([3, 3, 3, 1])
        
        with col1:
            st.session_state.stock_entries[i]["quantity"] = st.number_input(
                f"Quantity #{i+1}",
                min_value=1,
                value=int(entry["quantity"]),
                key=f"qty_{i}"
            )
        
        with col2:
            st.session_state.stock_entries[i]["price"] = st.number_input(
                f"Purchase Price #{i+1} (₹)",
                min_value=0.1,
                value=float(entry["price"]),
                step=0.5,
                key=f"price_{i}"
            )
        
        with col3:
            st.session_state.stock_entries[i]["date"] = st.date_input(
                f"Purchase Date #{i+1}",
                datetime.strptime(entry["date"], "%Y-%m-%d") if isinstance(entry["date"], str) else entry["date"],
                key=f"date_{i}",
                format="YYYY-MM-DD"
            ).strftime("%Y-%m-%d")
        
        with col4:
            if len(st.session_state.stock_entries) > 1:
                st.button("❌", key=f"del_{i}", on_click=delete_entry, args=(i,), help="Delete this entry")
        
        # Calculate running total
        entry_investment = st.session_state.stock_entries[i]["quantity"] * st.session_state.stock_entries[i]["price"]
        total_investment += entry_investment
        total_shares += st.session_state.stock_entries[i]["quantity"]
        
        # Build data for visualization
        purchase_data.append({
            "Date": st.session_state.stock_entries[i]["date"],
            "Quantity": st.session_state.stock_entries[i]["quantity"],
            "Price": st.session_state.stock_entries[i]["price"],
            "Investment": entry_investment
        })
    
    # Calculate and display results
    if st.button("Calculate Average Price", use_container_width=True):
        if total_shares > 0:
            average_price = total_investment / total_shares
            current_value = total_shares * current_price
            profit_loss = current_value - total_investment
            profit_loss_percentage = (profit_loss / total_investment) * 100
            
            # Display key metrics
            st.subheader("📊 Analysis Results")
            
            col1, col2, col3 = st.columns(3)
            with col1:
                st.metric(
                    "Average Cost (₹)",
                    f"₹{average_price:.2f}",
                    help="Weighted average purchase price per share"
                )
            with col2:
                st.metric(
                    "Total Shares",
                    f"{total_shares}",
                    help="Total number of shares held"
                )
            with col3:
                st.metric(
                    "Total Investment",
                    f"₹{total_investment:,.2f}",
                    help="Total amount invested"
                )
            
            # Unrealized P/L
            col1, col2, col3 = st.columns(3)
            with col1:
                st.metric(
                    "Current Value",
                    f"₹{current_value:,.2f}",
                    help="Current market value of your holdings"
                )
            with col2:
                st.metric(
                    "Unrealized Profit/Loss",
                    f"₹{profit_loss:,.2f}",
                    f"{profit_loss_percentage:.2f}%",
                    delta_color="normal" if profit_loss >= 0 else "inverse",
                    help="Unrealized gain or loss on your investment"
                )
            with col3:
                if average_price > current_price:
                    breakeven_increase = ((average_price / current_price) - 1) * 100
                    st.metric(
                        "Breakeven Increase Needed",
                        f"{breakeven_increase:.2f}%",
                        delta_color="inverse",
                        help="Percentage increase needed to reach breakeven"
                    )
                else:
                    buffer_percentage = ((current_price / average_price) - 1) * 100
                    st.metric(
                        "Downside Buffer",
                        f"{buffer_percentage:.2f}%",
                        delta_color="normal",
                        help="Percentage buffer before reaching breakeven point"
                    )
            
            # Create visualization - Purchase history
            st.subheader("Purchase History")
            
            # Create a DataFrame for visualization
            df = pd.DataFrame(purchase_data)
            df["Date"] = pd.to_datetime(df["Date"])
            df = df.sort_values("Date")
            
            # Price history chart
            fig = px.scatter(
                df,
                x="Date",
                y="Price",
                size="Quantity",
                color="Investment",
                title=f"{stock_name} Purchase History",
                labels={"Price": "Purchase Price (₹)"},
                hover_data=["Quantity", "Investment"]
            )
            
            # Add current price line
            fig.add_hline(
                y=current_price,
                line_dash="dash",
                line_color="green",
                annotation_text=f"Current Price: ₹{current_price}"
            )
            
            # Add average price line
            fig.add_hline(
                y=average_price,
                line_dash="dash",
                line_color="red",
                annotation_text=f"Average Price: ₹{average_price:.2f}"
            )
            
            st.plotly_chart(fig, use_container_width=True)
            
            # Breakdown of investment
            st.subheader("Investment Breakdown")
            
            # Create pie chart for investment distribution
            fig = px.pie(
                df,
                values="Investment",
                names=df["Date"].dt.strftime("%Y-%m-%d"),
                title="Investment Distribution by Purchase Date",
                hole=0.4
            )
            
            st.plotly_chart(fig, use_container_width=True)
            
            # Averaging strategy analysis
            st.subheader("Averaging Strategy Analysis")
            
            # Calculate average down/up scenarios
            if current_price < average_price:
                # Calculate how many shares needed to purchase at current price to reach target average
                col1, col2 = st.columns(2)
                
                with col1:
                    target_average = st.number_input(
                        "Target Average Price (₹)",
                        min_value=0.0,
                        max_value=average_price,
                        value=average_price * 0.9,  # Default to 10% reduction
                        step=0.5,
                        help="Your target average purchase price after averaging down"
                    )
                
                if target_average < average_price:
                    # Calculate shares needed to average down
                    additional_investment = (total_investment - (target_average * total_shares)) / (1 - (target_average / current_price))
                    additional_shares = additional_investment / current_price
                    
                    new_total_shares = total_shares + additional_shares
                    new_total_investment = total_investment + additional_investment
                    new_average = new_total_investment / new_total_shares
                    
                    st.success(f"""
                    ### Averaging Down Strategy
                    
                    To reduce your average price from **₹{average_price:.2f}** to **₹{target_average:.2f}**:
                    
                    - Buy **{additional_shares:.2f}** additional shares at current price of ₹{current_price}
                    - Additional investment required: **₹{additional_investment:,.2f}**
                    - New total shares: **{new_total_shares:.2f}**
                    - New total investment: **₹{new_total_investment:,.2f}**
                    - New average price: **₹{new_average:.2f}**
                    """)
                    
                    # Show averaging down visualization
                    averaging_data = {
                        "Scenario": ["Current", "After Averaging Down"],
                        "Average Price": [average_price, new_average],
                        "Total Shares": [total_shares, new_total_shares],
                        "Total Investment": [total_investment, new_total_investment]
                    }
                    
                    df_avg = pd.DataFrame(averaging_data)
                    
                    fig1 = px.bar(
                        df_avg,
                        x="Scenario",
                        y="Average Price",
                        title="Average Price Comparison",
                        color="Scenario"
                    )
                    
                    fig2 = px.bar(
                        df_avg,
                        x="Scenario",
                        y="Total Shares",
                        title="Total Shares Comparison",
                        color="Scenario"
                    )
                    
                    col1, col2 = st.columns(2)
                    with col1:
                        st.plotly_chart(fig1, use_container_width=True)
                    with col2:
                        st.plotly_chart(fig2, use_container_width=True)
            
            # Target selling price analysis
            st.subheader("Target Price Analysis")
            
            col1, col2 = st.columns(2)
            with col1:
                target_profit_percentage = st.slider(
                    "Target Profit Percentage (%)",
                    min_value=0,
                    max_value=100,
                    value=20,
                    step=5,
                    help="Your target profit percentage"
                )
            
            with col2:
                stop_loss_percentage = st.slider(
                    "Stop Loss Percentage (%)",
                    min_value=0,
                    max_value=50,
                    value=10,
                    step=5,
                    help="Your stop loss percentage"
                )
            
            target_selling_price = average_price * (1 + (target_profit_percentage / 100))
            stop_loss_price = average_price * (1 - (stop_loss_percentage / 100))
            
            # Calculate target profit and potential loss
            target_profit = (target_selling_price * total_shares) - total_investment
            potential_loss = total_investment - (stop_loss_price * total_shares)
            
            # Display target price analysis
            col1, col2, col3 = st.columns(3)
            with col1:
                st.metric(
                    "Target Selling Price",
                    f"₹{target_selling_price:.2f}",
                    f"{target_profit_percentage}% gain",
                    delta_color="normal",
                    help="Price at which you should consider selling to achieve target profit"
                )
            with col2:
                st.metric(
                    "Stop Loss Price",
                    f"₹{stop_loss_price:.2f}",
                    f"-{stop_loss_percentage}% loss",
                    delta_color="inverse",
                    help="Price at which you should consider cutting losses"
                )
            with col3:
                risk_reward_ratio = target_profit / potential_loss if potential_loss > 0 else float('inf')
                st.metric(
                    "Risk/Reward Ratio",
                    f"{risk_reward_ratio:.2f}",
                    help="Ratio of potential reward to potential risk (higher is better)"
                )
            
            # Profit scenarios
            st.subheader("Profit/Loss Scenarios")
            
            # Create profit scenarios
            scenarios = []
            price_changes = [-50, -25, -10, 0, 10, 25, 50, 100]
            
            for change in price_changes:
                scenario_price = average_price * (1 + (change / 100))
                scenario_value = scenario_price * total_shares
                scenario_pl = scenario_value - total_investment
                scenario_pl_percentage = (scenario_pl / total_investment) * 100
                
                scenarios.append({
                    "Price Change (%)": change,
                    "Stock Price (₹)": scenario_price,
                    "Portfolio Value (₹)": scenario_value,
                    "Profit/Loss (₹)": scenario_pl,
                    "Return (%)": scenario_pl_percentage
                })
            
            # Create DataFrame for scenarios
            df_scenarios = pd.DataFrame(scenarios)
            
            # Highlight current price in scenarios
            current_change_percentage = ((current_price / average_price) - 1) * 100
            current_row = {
                "Price Change (%)": round(current_change_percentage, 1),
                "Stock Price (₹)": current_price,
                "Portfolio Value (₹)": current_price * total_shares,
                "Profit/Loss (₹)": current_value - total_investment,
                "Return (%)": profit_loss_percentage
            }
            
            df_current = pd.DataFrame([current_row])
            
            # Create styled DataFrames
            st.write("#### Predefined Scenarios")
            st.dataframe(
                df_scenarios.style.format({
                    "Price Change (%)": "{:.1f}%",
                    "Stock Price (₹)": "₹{:.2f}",
                    "Portfolio Value (₹)": "₹{:,.2f}",
                    "Profit/Loss (₹)": "₹{:,.2f}",
                    "Return (%)": "{:.2f}%"
                }).background_gradient(
                    cmap="RdYlGn", subset=["Profit/Loss (₹)", "Return (%)"]
                ),
                use_container_width=True
            )
            
            st.write("#### Current Scenario")
            st.dataframe(
                df_current.style.format({
                    "Price Change (%)": "{:.1f}%",
                    "Stock Price (₹)": "₹{:.2f}",
                    "Portfolio Value (₹)": "₹{:,.2f}",
                    "Profit/Loss (₹)": "₹{:,.2f}",
                    "Return (%)": "{:.2f}%"
                }).background_gradient(
                    cmap="RdYlGn", subset=["Profit/Loss (₹)", "Return (%)"]
                ),
                use_container_width=True
            )
            
            # Investment insights based on analysis
            st.info("""
            ### 💡 Key Insights
            1. **Dollar-Cost Averaging**: Regularly buying shares can reduce the impact of volatility
            2. **Average Down Strategically**: Only average down if your research supports the stock's long-term potential
            3. **Set Clear Targets**: Define both profit targets and stop losses before investing
            4. **Monitor Key Metrics**: Keep track of the company's fundamentals, not just stock price
            5. **Diversification**: Avoid concentrating too much of your portfolio in a single stock
            """)
            
            # Tax implications
            with st.expander("💸 Tax Implications"):
                st.markdown("""
                ### Tax Considerations for Stock Investments in India
                
                1. **Short-Term Capital Gains (STCG)**
                   - Applicable when stocks are sold within 12 months of purchase
                   - Taxed at flat 15% (plus applicable surcharge and cess)
                   - No indexation benefits available
                
                2. **Long-Term Capital Gains (LTCG)**
                   - Applicable when stocks are sold after holding for more than 12 months
                   - Taxed at 10% on gains exceeding ₹1 lakh in a financial year
                   - No indexation benefits available
                
                3. **Securities Transaction Tax (STT)**
                   - 0.1% on the value of shares sold
                   - Already included in the transaction by your broker
                
                4. **Dividend Income**
                   - Taxed as per individual's income tax slab rate
                   - No dividend distribution tax at company level
                
                5. **Tax-Saving Tips**
                   - Consider tax harvesting by balancing gains with losses
                   - Use tax-advantaged accounts like ELSS mutual funds
                   - Maintain proper documentation of all transactions for tax filing
                """)
        else:
            st.error("Please add at least one purchase entry with quantity greater than zero.")

# Discount Calculator
def show_discount_calculator():
    st.header("Discount Calculator")
    st.write("""
    Calculate the discounted price of products and services based on the original price and discount percentage. 
    This calculator helps you understand the actual savings and make better shopping decisions.
    """)
    
    col1, col2 = st.columns(2)
    with col1:
        original_price = st.number_input(
            "Original Price (₹)",
            min_value=0.0,
            value=1000.0,
            step=100.0
        )
    
    with col2:
        discount_percentage = st.number_input(
            "Discount Percentage (%)",
            min_value=0.0,
            max_value=100.0,
            value=10.0,
            step=1.0
        )
        
    discount_type = st.radio(
        "Discount Type",
        ["Simple Discount", "Stacked Discounts"]
    )
    
    if discount_type == "Stacked Discounts":
        additional_discount = st.number_input(
            "Additional Discount Percentage (%)",
            min_value=0.0,
            max_value=100.0,
            value=5.0,
            step=1.0
        )
        
    tax_included = st.checkbox("Include GST Calculation")
    
    if tax_included:
        gst_rate = st.selectbox(
            "GST Rate (%)",
            [0, 5, 12, 18, 28],
            index=2
        )
    
    if st.button("Calculate Discount", use_container_width=True):
        if discount_type == "Simple Discount":
            # Simple discount calculation
            discount_amount = original_price * (discount_percentage / 100)
            discounted_price = original_price - discount_amount
            percent_saved = discount_percentage
        else:
            # Stacked discounts calculation
            first_discount = original_price * (discount_percentage / 100)
            first_discounted_price = original_price - first_discount
            
            second_discount = first_discounted_price * (additional_discount / 100)
            discounted_price = first_discounted_price - second_discount
            
            total_discount = original_price - discounted_price
            discount_amount = total_discount
            percent_saved = (total_discount / original_price) * 100
        
        # Display results before tax
        st.subheader("📊 Discount Analysis")
        
        col1, col2, col3 = st.columns(3)
        with col1:
            st.metric(
                "Original Price",
                f"₹{original_price:,.2f}"
            )
        with col2:
            st.metric(
                "Discount Amount",
                f"₹{discount_amount:,.2f}",
                f"{percent_saved:.2f}%"
            )
        with col3:
            st.metric(
                "Final Price",
                f"₹{discounted_price:,.2f}",
                f"-₹{discount_amount:,.2f}"
            )
        
        if tax_included:
            # Calculate post-tax values
            gst_amount = discounted_price * (gst_rate / 100)
            final_price_with_tax = discounted_price + gst_amount
            
            st.subheader("Tax Calculation")
            
            col1, col2, col3 = st.columns(3)
            with col1:
                st.metric(
                    "Price Before Tax",
                    f"₹{discounted_price:,.2f}"
                )
            with col2:
                st.metric(
                    f"GST ({gst_rate}%)",
                    f"₹{gst_amount:,.2f}"
                )
            with col3:
                st.metric(
                    "Final Price (with GST)",
                    f"₹{final_price_with_tax:,.2f}"
                )
                
            # Calculate original price with tax for comparison
            original_gst = original_price * (gst_rate / 100)
            original_with_tax = original_price + original_gst
            total_saved = original_with_tax - final_price_with_tax
            
            st.success(f"""
            **Total Savings:**
            - Original price (with {gst_rate}% GST): ₹{original_with_tax:,.2f}
            - Final price (with {gst_rate}% GST): ₹{final_price_with_tax:,.2f}
            - Total savings: ₹{total_saved:,.2f} ({(total_saved/original_with_tax*100):.2f}%)
            """)
            
        # Visualization
        st.subheader("Price Breakdown")
        
        if discount_type == "Simple Discount":
            # Visualization for simple discount
            fig_data = pd.DataFrame([
                {"Category": "Original Price", "Amount": original_price},
                {"Category": "Discount", "Amount": discount_amount},
                {"Category": "Final Price", "Amount": discounted_price}
            ])
            
            fig = px.bar(
                fig_data, 
                x="Category", 
                y="Amount",
                title="Price Breakdown",
                color="Category",
                text="Amount",
                color_discrete_map={
                    "Original Price": "#636EFA", 
                    "Discount": "#EF553B",
                    "Final Price": "#00CC96"
                }
            )
            
            # Update text format to show rupee symbol and comma-separated values
            fig.update_traces(texttemplate="₹%{y:,.2f}", textposition="inside")
            
        else:
            # Visualization for stacked discounts
            first_discount = original_price * (discount_percentage / 100)
            first_discounted_price = original_price - first_discount
            
            second_discount = first_discounted_price * (additional_discount / 100)
            final_discounted_price = first_discounted_price - second_discount
            
            fig_data = pd.DataFrame([
                {"Stage": "Original Price", "Price": original_price},
                {"Stage": f"After {discount_percentage}% Discount", "Price": first_discounted_price},
                {"Stage": f"After Additional {additional_discount}% Discount", "Price": final_discounted_price}
            ])
            
            fig = px.line(
                fig_data,
                x="Stage",
                y="Price",
                title="Price Reduction Stages",
                markers=True
            )
            
            # Add price labels above points
            fig.update_traces(texttemplate="₹%{y:,.2f}", textposition="top center")
            
        st.plotly_chart(fig, use_container_width=True)
        
        # Shopping tips based on discount
        st.subheader("💡 Shopping Tips")
        
        if percent_saved < 10:
            st.info("""
            **Small Discount (< 10%)**
            - Consider waiting for better promotions if the item is not urgent
            - Look for coupon codes or loyalty program offers that might stack
            - Compare prices across different retailers before purchasing
            """)
        elif percent_saved < 25:
            st.info("""
            **Moderate Discount (10-25%)**
            - This is a typical discount range for many products on sale
            - Good opportunity to buy if you were planning to purchase anyway
            - Still worth comparing prices with other retailers
            """)
        elif percent_saved < 50:
            st.success("""
            **Significant Discount (25-50%)**
            - This represents a substantial discount on most products
            - Excellent opportunity to purchase if the item is on your wish list
            - Consider stocking up on consumable items at this discount level
            """)
        else:
            st.success("""
            **Deep Discount (> 50%)**
            - Exceptional savings opportunity - these discounts are less common
            - Ideal time to make planned purchases or stock up on essentials
            - Be cautious of extremely high discounts on luxury goods or electronics (verify authenticity)
            """)
            
        # Additional tips
        if discount_type == "Stacked Discounts":
            effective_rate = percent_saved
            nominal_rate = discount_percentage + additional_discount
            
            st.info(f"""
            **Understanding Stacked Discounts:**
            - Combined nominal discount rate: {nominal_rate:.2f}%
            - Effective discount rate: {effective_rate:.2f}%
            
            Note: Stacked discounts are applied sequentially, not simultaneously.
            A {discount_percentage}% discount followed by {additional_discount}% is not the same as a single {nominal_rate}% discount.
            """)
        
        if tax_included:
            st.info("""
            **GST Considerations:**
            - Always check if advertised discounts are pre-GST or inclusive of GST
            - Some retailers advertise higher discounts by excluding tax in the calculation
            - For significant purchases, the GST amount is substantial and should be factored into your budget
            """)

# CAGR Calculator
def show_cagr_calculator():
    st.header("CAGR Calculator (Compound Annual Growth Rate)")
    st.write("""
    Calculate the year-over-year growth rate of an investment over a specified time period.
    CAGR smooths out investment returns, providing a clearer picture of performance.
    """)
    
    col1, col2 = st.columns(2)
    with col1:
        initial_investment = st.number_input(
            "Initial Investment Amount (₹)",
            min_value=100,
            value=100000,
            step=1000
        )
        final_value = st.number_input(
            "Final Investment Value (₹)",
            min_value=100,
            value=250000,
            step=1000
        )
    
    with col2:
        time_period_years = st.number_input(
            "Investment Time Period (Years)",
            min_value=1,
            value=5,
            step=1
        )
        compare_with = st.multiselect(
            "Compare With",
            ["Fixed Deposit", "PPF", "Nifty 50", "Sensex", "Gold", "Real Estate"],
            default=["Fixed Deposit", "PPF"]
        )
    
    if st.button("Calculate CAGR", use_container_width=True):
        # Calculate CAGR
        cagr = ((final_value / initial_investment) ** (1 / time_period_years) - 1) * 100
        
        # Display result
        st.subheader("📊 CAGR Analysis")
        
        st.metric(
            "Compound Annual Growth Rate (CAGR)",
            f"{cagr:.2f}%"
        )
        
        # Additional metrics
        col1, col2, col3 = st.columns(3)
        with col1:
            st.metric(
                "Total Growth",
                f"{((final_value - initial_investment) / initial_investment * 100):.2f}%"
            )
        with col2:
            st.metric(
                "Initial Investment",
                f"₹{initial_investment:,.2f}"
            )
        with col3:
            st.metric(
                "Final Value",
                f"₹{final_value:,.2f}"
            )
        
        # Visualization
        st.subheader("Growth Visualization")
        
        # Generate year-wise growth data
        years = list(range(time_period_years + 1))
        values = [initial_investment * ((1 + cagr/100) ** year) for year in years]
        
        df = pd.DataFrame({
            'Year': years,
            'Value': values
        })
        
        fig = px.line(
            df,
            x='Year',
            y='Value',
            title=f'Investment Growth at {cagr:.2f}% CAGR',
            labels={'Value': 'Amount (₹)'}
        )
        st.plotly_chart(fig, use_container_width=True)
        
        # Comparison with benchmarks
        if compare_with:
            st.subheader("Comparison with Other Investments")
            
            # Benchmark rates (averages over long term)
            benchmark_rates = {
                "Fixed Deposit": 6.0,
                "PPF": 7.1,
                "Nifty 50": 12.0,
                "Sensex": 13.5,
                "Gold": 8.0,
                "Real Estate": 9.0
            }
            
            # Calculate final values for benchmarks
            benchmarks = []
            for benchmark in compare_with:
                rate = benchmark_rates[benchmark]
                final = initial_investment * ((1 + rate/100) ** time_period_years)
                
                benchmarks.append({
                    "Investment": benchmark,
                    "CAGR (%)": rate,
                    "Final Value (₹)": final,
                    "Difference (₹)": final - final_value,
                    "Difference (%)": ((final - final_value) / final_value) * 100
                })
            
            # Convert to dataframe
            benchmarks_df = pd.DataFrame(benchmarks)
            
            # Display comparison table
            st.dataframe(
                benchmarks_df.style.format({
                    "CAGR (%)": "{:.2f}",
                    "Final Value (₹)": "₹{:,.2f}",
                    "Difference (₹)": "₹{:,.2f}",
                    "Difference (%)": "{:+.2f}%"
                })
            )
            
            # Visual comparison
            fig = px.bar(
                benchmarks_df,
                x="Investment",
                y="Final Value (₹)",
                title="Comparison of Final Investment Values",
                color="CAGR (%)",
                color_continuous_scale="Viridis"
            )
            
            # Add your investment's final value as a horizontal line
            fig.add_shape(
                type="line",
                x0=-0.5,
                x1=len(benchmarks_df) - 0.5,
                y0=final_value,
                y1=final_value,
                line=dict(color="red", width=2, dash="dash")
            )
            
            fig.add_annotation(
                x=0,
                y=final_value,
                text=f"Your Investment: ₹{final_value:,.0f}",
                showarrow=True,
                arrowhead=1,
                yshift=10
            )
            
            st.plotly_chart(fig, use_container_width=True)
        
        # CAGR insights
        st.subheader("💡 Key Insights")
        
        # Rate categorization
        if cagr < 0:
            st.error("Your investment has declined in value over time. Consider reviewing your investment strategy.")
        elif cagr < 6:
            st.warning(f"""
            CAGR of {cagr:.2f}% is comparable to fixed deposits but may not beat inflation in the long run.
            Consider reviewing your asset allocation for potentially better returns.
            """)
        elif cagr < 10:
            st.info(f"""
            CAGR of {cagr:.2f}% is decent and likely beats inflation.
            This is comparable to returns from debt mutual funds and some hybrid investments.
            """)
        elif cagr < 15:
            st.success(f"""
            CAGR of {cagr:.2f}% is good and comparable to long-term equity market returns.
            Your investment strategy appears to be working well.
            """)
        else:
            st.success(f"""
            CAGR of {cagr:.2f}% is excellent and significantly above average market returns.
            This performance is exceptional if maintained over long periods.
            """)
        
        # Inflation-adjusted returns
        inflation_rate = 6.0  # Assumed average inflation
        real_cagr = cagr - inflation_rate
        
        st.info(f"""
        **Real Returns (Inflation-Adjusted):**
        - Nominal CAGR: {cagr:.2f}%
        - Average Inflation: {inflation_rate:.2f}%
        - Real CAGR: {real_cagr:.2f}%
        
        This means your investment has {'gained' if real_cagr > 0 else 'lost'} purchasing power over time.
        """)
        
        # Future projections
        st.subheader("Future Projections")
        st.write("If you continue investing at the same CAGR:")
        
        projection_years = [5, 10, 15, 20]
        projections = []
        
        for years in projection_years:
            projected_value = final_value * ((1 + cagr/100) ** years)
            projections.append({
                "Years": years,
                "Projected Value": projected_value
            })
        
        projections_df = pd.DataFrame(projections)
        
        st.dataframe(
            projections_df.style.format({
                "Projected Value": "₹{:,.2f}"
            })
        )
        
        # Doubling time
        if cagr > 0:
            doubling_time = 72 / cagr  # Rule of 72 approximation
            st.write(f"**Time to Double:** Approximately {doubling_time:.1f} years at the current CAGR of {cagr:.2f}%")

# Functions for new calculators
def add_new_calculators(calculator):
    """Add new calculators from the utils/calculators module"""
    if not new_calculators_available:
        return False
        
    # New Calculators 
    if calculator == "PPF Calculator 💰":
        show_ppf_calculator()
        return True
        
    elif calculator == "FD Calculator 🏦":
        show_fd_calculator()
        return True
        
    elif calculator == "Income Tax Calculator 💰":
        show_income_tax_calculator()
        return True
        
    elif calculator == "HRA Calculator 🏠":
        show_hra_calculator()
        return True
        
    elif calculator == "Sukanya Samriddhi Yojana Calculator 👧":
        show_ssy_calculator()
        return True
        
    elif calculator == "Lumpsum Calculator 📈":
        show_lumpsum_calculator()
        return True
        
    elif calculator == "Vehicle Comparison Calculator 🚗":
        show_vehicle_comparison_calculator()
        return True
        
    return False

# Modify the show function to include new calculators
original_show = show

def show_with_new_calculators():
    """Enhanced show function that includes new calculators"""
    st.session_state.used_new_calculator = False
    original_show()
    
    # If the selected calculator is one of our new ones and not yet displayed
    if not st.session_state.get("used_new_calculator", False):
        # Extract the calculator name from the URL query parameters
        query_params = st.query_params
        calculator = query_params.get("calculator", "")
        
        # If we have a calculator specified, try to show it
        if calculator and add_new_calculators(calculator):
            st.session_state.used_new_calculator = True

# Replace the original show function
show = show_with_new_calculators

# Calculate Sukanya Samriddhi Yojana (SSY) returns
def calculate_ssy_returns(annual_investment, interest_rate, girl_age, maturity_age=21):
    """
    Calculate Sukanya Samriddhi Yojana (SSY) returns
    
    Args:
        annual_investment: Annual investment amount (Min: 250, Max: 150000)
        interest_rate: Annual interest rate (%)
        girl_age: Current age of the girl child (0-10 years)
        maturity_age: Maturity age (default 21 years)
        
    Returns:
        Dictionary with SSY calculation results
    """
    # Validate inputs
    if girl_age < 0 or girl_age > 10:
        return None  # Invalid age
    
    # Calculate deposit period (15 years from account opening)
    deposit_years = min(15, maturity_age - girl_age)
    
    # Calculate total investment period
    total_years = maturity_age - girl_age
    
    # SSY calculation with annual compounding
    balance = 0
    yearly_details = []
    total_deposit = 0
    
    for year in range(1, total_years + 1):
        opening_balance = balance
        
        # Add deposit for deposit duration (first 15 years)
        deposit = annual_investment if year <= deposit_years else 0
        total_deposit += deposit
        
        # Calculate interest
        interest = (opening_balance + deposit) * (interest_rate / 100)
        
        # Update balance
        balance = opening_balance + deposit + interest
        
        # Store yearly details
        yearly_details.append({
            'Year': year,
            'Age': girl_age + year,
            'Opening Balance': opening_balance,
            'Deposit': deposit,
            'Interest': interest,
            'Closing Balance': balance
        })
    
    # Calculate returns
    total_interest = balance - total_deposit
    
    return {
        'yearly_details': yearly_details,
        'maturity_amount': balance,
        'total_deposit': total_deposit,
        'total_interest': total_interest,
        'deposit_years': deposit_years,
        'total_years': total_years
    }

# Function to show SSY Calculator
def show_nsc_calculator():
    """Show the National Savings Certificate (NSC) calculator interface"""
    st.header("National Savings Certificate (NSC) Calculator 📃")
    
    st.write("""
    Calculate returns from National Savings Certificate (NSC), a popular government-backed fixed income 
    investment option in India. This calculator helps estimate the maturity amount based on your investment 
    and the current interest rate.
    """)
    
    st.info("""
    ### About National Savings Certificate (NSC)
    
    NSC is a government-backed savings bond with the following features:
    - Available at post offices across India
    - 5-year lock-in period (NSC VIII issue)
    - Interest compounded annually but paid at maturity
    - Can be used as collateral for loans
    - Tax benefits under Section 80C of Income Tax Act
    - Current interest rate: 7.7% p.a. (Q1 FY 2025-26)
    """)
    
    col1, col2 = st.columns(2)
    
    with col1:
        investment_amount = st.number_input(
            "Investment Amount (₹)",
            min_value=100,
            max_value=10000000,
            value=50000,
            step=1000,
            help="Investment amount in NSC (Min: ₹100)"
        )
        
    with col2:
        interest_rate = st.number_input(
            "Interest Rate (% p.a.)",
            min_value=7.0,
            max_value=9.0,
            value=7.7,
            step=0.1,
            help="Current NSC interest rate (updated quarterly by govt)"
        )
    
    tenure = 5  # Fixed tenure for NSC
    
    if st.button("Calculate NSC Returns", use_container_width=True):
        # Calculate NSC returns
        years = range(1, tenure + 1)
        yearly_details = []
        
        # Calculate year-by-year growth
        current_value = investment_amount
        for year in years:
            opening_balance = current_value
            interest = opening_balance * (interest_rate / 100)
            closing_balance = opening_balance + interest
            
            yearly_details.append({
                "Year": year,
                "Opening Balance": opening_balance,
                "Interest Earned": interest,
                "Closing Balance": closing_balance
            })
            
            current_value = closing_balance
        
        # Extract final values
        maturity_amount = yearly_details[-1]["Closing Balance"]
        total_interest = maturity_amount - investment_amount
        
        # Display key metrics
        st.subheader("📊 NSC Investment Summary")
        
        col1, col2, col3 = st.columns(3)
        with col1:
            st.metric(
                "Principal Amount",
                f"₹{investment_amount:,.2f}"
            )
        with col2:
            st.metric(
                "Interest Earned",
                f"₹{total_interest:,.2f}"
            )
        with col3:
            st.metric(
                "Maturity Amount",
                f"₹{maturity_amount:,.2f}"
            )
        
        # ROI metrics
        st.subheader("📈 Return on Investment")
        
        roi_col1, roi_col2, roi_col3 = st.columns(3)
        with roi_col1:
            absolute_roi = (total_interest / investment_amount) * 100
            st.metric(
                "Absolute ROI",
                f"{absolute_roi:.2f}%",
                help="Total returns as percentage of investment"
            )
        with roi_col2:
            annual_roi = ((maturity_amount / investment_amount) ** (1 / tenure) - 1) * 100
            st.metric(
                "Effective Annual ROI",
                f"{annual_roi:.2f}%",
                help="Annualized return on investment"
            )
        with roi_col3:
            interest_ratio = total_interest / investment_amount
            st.metric(
                "Interest to Investment Ratio",
                f"{interest_ratio:.2f}x",
                help="How many times your investment you earn as interest"
            )
        
        # Timeline visualization
        st.subheader("NSC Growth Over Time")
        
        # Convert yearly details to DataFrame for visualization
        df = pd.DataFrame(yearly_details)
        
        # Create visualization
        fig = go.Figure()
        
        # Add interest earned series (bars)
        fig.add_trace(
            go.Bar(
                x=df['Year'],
                y=df['Interest Earned'],
                name="Interest Earned",
                marker_color="#2ECC71",
                hovertemplate='Year %{x}<br>Interest: ₹%{y:,.2f}'
            )
        )
        
        # Add balance series (line)
        fig.add_trace(
            go.Scatter(
                x=df['Year'],
                y=df['Closing Balance'],
                name="Certificate Value",
                mode="lines+markers",
                line=dict(color="#E74C3C", width=3),
                hovertemplate='Year %{x}<br>Value: ₹%{y:,.2f}'
            )
        )
        
        # Update layout
        fig.update_layout(
            title="NSC Value Growth",
            xaxis_title="Year",
            yaxis_title="Amount (₹)",
            legend=dict(
                orientation="h",
                yanchor="bottom",
                y=1.02,
                xanchor="right",
                x=1
            ),
            hovermode="x unified"
        )
        
        # Format x-axis to show only whole numbers for years
        fig.update_xaxes(tickformat=',d')
        
        st.plotly_chart(fig, use_container_width=True)
        
        # Yearly breakup table
        with st.expander("View Yearly Details"):
            st.dataframe(
                df.style.format({
                    'Opening Balance': '₹{:,.2f}',
                    'Interest Earned': '₹{:,.2f}',
                    'Closing Balance': '₹{:,.2f}'
                }),
                use_container_width=True
            )
        
        # Tax benefits
        st.subheader("💰 Tax Benefits")
        st.info("""
        ### Section 80C Benefits
        
        - Investment in NSC qualifies for tax deduction under Section 80C
        - Maximum deduction of ₹1.5 lakh per financial year (combined with other 80C investments)
        - Interest earned for the first 4 years is reinvested and eligible for tax deduction
        - Interest earned in the final year is taxable
        """)
        
        if investment_amount > 0:
            tax_slab_options = {
                "10% (₹2.5L - ₹5L)": 10,
                "20% (₹5L - ₹10L)": 20,
                "30% (Above ₹10L)": 30
            }
            
            selected_tax_slab = st.selectbox(
                "Select Your Income Tax Slab",
                options=list(tax_slab_options.keys()),
                index=1  # Default to 20%
            )
            
            tax_rate = tax_slab_options[selected_tax_slab]
            annual_tax_saving = min(investment_amount, 150000) * (tax_rate / 100)
            
            # Calculate interest earned in first 4 years (deductible)
            first_4_years_interest = sum(item["Interest Earned"] for item in yearly_details[:4])
            first_4_years_tax_saving = min(first_4_years_interest, 150000 - min(investment_amount, 150000)) * (tax_rate / 100)
            
            total_tax_saving = annual_tax_saving
            if first_4_years_tax_saving > 0:
                total_tax_saving += first_4_years_tax_saving
            
            st.success(f"""
            **First Year Tax Saving:** ₹{annual_tax_saving:,.2f}
            
            Your investment of ₹{investment_amount:,.2f} in NSC can save you up to ₹{annual_tax_saving:,.2f} 
            in income tax in the first year (based on {tax_rate}% tax slab).
            
            **Additional Tax Savings:** You may also claim deduction on the accrued interest for the first 4 years 
            under Section 80C, subject to overall limit of ₹1.5 lakh.
            """)
        
        # Key insights and tips
        st.subheader("💡 Key Insights")
        
        # Calculate compound interest advantage
        simple_interest = investment_amount * (interest_rate/100) * tenure
        compound_advantage = total_interest - simple_interest
        
        st.info(f"""
        ### Compounding Advantage
        
        By investing in NSC, you gain ₹{compound_advantage:,.2f} extra through compound interest 
        compared to simple interest over the 5-year period.
        
        ### Tips for NSC Investment
        
        1. **Tax Planning:** Use NSC as part of your tax-saving strategy under Section 80C
        2. **Laddering:** Create an NSC ladder by investing annually for stable returns and liquidity
        3. **Documentation:** Keep your NSC certificates in a safe place and maintain proper records
        4. **Loan Option:** NSC can be used as collateral for loans from banks in case of emergency needs
        """)
        
        # Comparison with other investments
        st.subheader("📊 Comparison with Other Investments")
        
        other_investments = {
            "Scheme": ["NSC", "PPF", "Bank FD", "ELSS Mutual Fund", "Tax-saving FD"],
            "Annual Return (%)": [interest_rate, 7.1, 6.7, "10-12 (variable)", 6.5],
            "Lock-in Period": ["5 years", "15 years", "Flexible", "3 years", "5 years"],
            "Tax Benefits": ["80C", "80C + Tax-free", "Taxable", "80C", "80C"],
            "Risk Level": ["Very Low", "Very Low", "Very Low", "Moderate-High", "Very Low"]
        }
        
        comparison_df = pd.DataFrame(other_investments)
        st.table(comparison_df)

def show_ssy_calculator():
    """Show the Sukanya Samriddhi Yojana (SSY) calculator interface"""
    st.header("Sukanya Samriddhi Yojana (SSY) Calculator 👧")
    
    st.write("""
    Calculate returns from the Sukanya Samriddhi Yojana (SSY), a government-backed small savings scheme 
    for the girl child in India. This calculator helps estimate the maturity amount based on your annual 
    contributions and the current interest rate.
    """)
    
    st.info("""
    ### About Sukanya Samriddhi Yojana
    
    SSY is a government-backed saving scheme for the girl child with the following features:
    - Account can be opened for girls below 10 years of age
    - Deposits can be made for 15 years from account opening
    - Account matures when the girl turns 21 years (can be extended)
    - Partial withdrawal allowed for education after the girl turns 18
    - Tax benefits under Section 80C of Income Tax Act
    - Current interest rate: 8.2% p.a. (Q1 FY 2025-26)
    """)
    
    col1, col2 = st.columns(2)
    
    with col1:
        annual_investment = st.number_input(
            "Annual Investment (₹)",
            min_value=250,
            max_value=150000,
            value=25000,
            step=1000,
            help="Annual contribution amount (Min: ₹250, Max: ₹1,50,000)"
        )
        
        interest_rate = st.number_input(
            "Interest Rate (% p.a.)",
            min_value=7.0,
            max_value=9.5,
            value=8.2,
            step=0.1,
            help="Current SSY interest rate (updated quarterly by govt)"
        )
    
    with col2:
        girl_age = st.number_input(
            "Girl's Current Age (years)",
            min_value=0,
            max_value=10,
            value=3,
            step=1,
            help="Age of the girl child (0-10 years only)"
        )
        
        maturity_age = st.number_input(
            "Maturity Age (years)",
            min_value=18,
            max_value=25,  # Allow extending beyond 21 years
            value=21,
            step=1,
            help="Age at which you want to calculate maturity (default 21 years)"
        )
    
    if st.button("Calculate SSY Returns", use_container_width=True):
        if girl_age > 10:
            st.error("SSY accounts can only be opened for girls up to 10 years of age.")
            return
        
        results = calculate_ssy_returns(
            annual_investment,
            interest_rate,
            girl_age,
            maturity_age
        )
        
        if not results:
            st.error("Invalid inputs. Please check and try again.")
            return
        
        # Display key metrics
        st.subheader("📊 SSY Investment Summary")
        
        col1, col2, col3 = st.columns(3)
        with col1:
            st.metric(
                "Total Investment",
                f"₹{results['total_deposit']:,.2f}"
            )
        with col2:
            st.metric(
                "Interest Earned",
                f"₹{results['total_interest']:,.2f}"
            )
        with col3:
            st.metric(
                "Maturity Amount",
                f"₹{results['maturity_amount']:,.2f}"
            )
        
        # ROI metrics
        st.subheader("📈 Return on Investment")
        
        roi_col1, roi_col2, roi_col3 = st.columns(3)
        with roi_col1:
            absolute_roi = (results['total_interest'] / results['total_deposit']) * 100
            st.metric(
                "Absolute ROI",
                f"{absolute_roi:.2f}%",
                help="Total returns as percentage of total investment"
            )
        with roi_col2:
            annual_roi = ((results['maturity_amount'] / results['total_deposit']) ** (1 / results['total_years']) - 1) * 100
            st.metric(
                "Annual ROI",
                f"{annual_roi:.2f}%",
                help="Annualized return on investment"
            )
        with roi_col3:
            interest_ratio = results['total_interest'] / results['total_deposit']
            st.metric(
                "Interest to Investment Ratio",
                f"{interest_ratio:.2f}x",
                help="How many times your investment you earn as interest"
            )
        
        # Timeline visualization with deposit period highlighted
        st.subheader("SSY Investment Timeline")
        
        # Convert yearly details to DataFrame for visualization
        df = pd.DataFrame(results['yearly_details'])
        
        # Create visualization with highlighted deposit period
        fig = go.Figure()
        
        # Add deposit series (bars)
        fig.add_trace(
            go.Bar(
                x=df['Year'],
                y=df['Deposit'],
                name="Annual Deposit",
                marker_color="#3498DB",
                hovertemplate='Year %{x}<br>Deposit: ₹%{y:,.2f}'
            )
        )
        
        # Add interest earned series (bars)
        fig.add_trace(
            go.Bar(
                x=df['Year'],
                y=df['Interest'],
                name="Interest Earned",
                marker_color="#2ECC71",
                hovertemplate='Year %{x}<br>Interest: ₹%{y:,.2f}'
            )
        )
        
        # Add balance series (line)
        fig.add_trace(
            go.Scatter(
                x=df['Year'],
                y=df['Closing Balance'],
                name="Account Balance",
                mode="lines+markers",
                line=dict(color="#E74C3C", width=3),
                hovertemplate='Year %{x}<br>Balance: ₹%{y:,.2f}'
            )
        )
        
        # Update layout
        fig.update_layout(
            title="SSY Account Growth Over Time",
            xaxis_title="Year",
            yaxis_title="Amount (₹)",
            legend=dict(
                orientation="h",
                yanchor="bottom",
                y=1.02,
                xanchor="right",
                x=1
            ),
            barmode="stack",
            hovermode="x unified"
        )
        
        # Add vertical line to mark end of deposit period
        fig.add_vline(
            x=results['deposit_years'], 
            line_width=2, 
            line_dash="dash", 
            line_color="rgba(0,0,0,0.5)",
            annotation_text="End of Deposit Period",
            annotation_position="top right"
        )
        
        st.plotly_chart(fig, use_container_width=True)
        
        # Yearly breakup table
        with st.expander("View Yearly Details"):
            st.dataframe(
                df.style.format({
                    'Opening Balance': '₹{:,.2f}',
                    'Deposit': '₹{:,.2f}',
                    'Interest': '₹{:,.2f}',
                    'Closing Balance': '₹{:,.2f}'
                }),
                use_container_width=True
            )
        
        # Tax benefits
        st.subheader("💰 Tax Benefits")
        st.info("""
        ### Section 80C Benefits
        
        - Annual investment in SSY qualifies for tax deduction under Section 80C
        - Maximum deduction of ₹1.5 lakh per financial year (combined with other 80C investments)
        - Interest earned and maturity amount are completely tax-free
        """)
        
        if annual_investment > 0:
            tax_slab_options = {
                "10% (₹2.5L - ₹5L)": 10,
                "20% (₹5L - ₹10L)": 20,
                "30% (Above ₹10L)": 30
            }
            
            selected_tax_slab = st.selectbox(
                "Select Your Income Tax Slab",
                options=list(tax_slab_options.keys()),
                index=1  # Default to 20%
            )
            
            tax_rate = tax_slab_options[selected_tax_slab]
            annual_tax_saving = min(annual_investment, 150000) * (tax_rate / 100)
            
            st.success(f"""
            **Annual Tax Saving:** ₹{annual_tax_saving:,.2f}
            
            Your investment of ₹{annual_investment:,.2f} in SSY can save you up to ₹{annual_tax_saving:,.2f} 
            per year in income tax (based on {tax_rate}% tax slab).
            """)
        
        # Key insights and tips
        st.subheader("💡 Key Insights")
        
        # Calculate compound interest advantage
        simple_interest = results['total_deposit'] * (interest_rate/100) * results['total_years']
        compound_advantage = results['total_interest'] - simple_interest
        
        st.info(f"""
        ### Compounding Advantage
        
        By investing in SSY for your daughter, you gain ₹{compound_advantage:,.2f} extra through 
        compound interest compared to simple interest.
        
        ### Tips for Maximizing SSY Returns
        
        1. **Maximize Annual Contribution:** Try to contribute the maximum ₹1,50,000 annually for higher returns
        2. **Start Early:** Open account as early as possible after your daughter's birth
        3. **Regular Deposits:** Make consistent annual deposits for full 15 years
        4. **Hold Until Maturity:** Avoid premature withdrawals to maximize interest earnings
        """)
        
        # Comparison with other investments
        st.subheader("📊 Comparison with Other Investments")
        
        other_investments = {
            "Scheme": ["PPF", "Bank FD", "Mutual Fund (Equity)", "NSC", "SSY (Current)"],
            "Annual Return (%)": [7.1, 6.7, 10.5, 7.7, interest_rate],
            "Lock-in Period": ["15 years", "Flexible", "Flexible", "5 years", "Until girl is 21"],
            "Tax Benefits": ["80C + Tax-free", "Taxable", "LTCG over ₹1L", "80C only", "80C + Tax-free"],
            "Risk Level": ["Very Low", "Very Low", "Moderate-High", "Very Low", "Very Low"]
        }
        
        comparison_df = pd.DataFrame(other_investments)
        st.table(comparison_df)
        
        # Show celebration for significant returns
        if results['total_interest'] > results['total_deposit']:
            show_celebration_animation(
                results['total_interest'],
                "🎉 Excellent Investment for Your Daughter's Future! 🎉"
            )
                
        # Goal integration section
        with st.expander("💡 Create a Goal for Your Daughter's Education"):
            st.markdown("""
            Want to track this SSY investment as a financial goal? Create a goal to monitor your progress!
            """)
            
            goal_name = st.text_input("Goal Name", value=f"Daughter's Education Fund")
            
            # Auto-fill values from calculator
            col1, col2 = st.columns(2)
            with col1:
                st.write(f"Target Amount: **₹{results['maturity_amount']:,.2f}**")
            with col2:
                st.write(f"Annual Contribution: **₹{annual_investment:,.2f}**")
            
            current_balance = st.number_input(
                "Current SSY Balance",
                min_value=0,
                value=0,
                step=1000,
                help="Enter the current balance if account already exists"
            )
            
            if st.button("Create Goal", use_container_width=True):
                
                # Store goal data in session state for transfer to goal_settings
                if "temp_goal_data" not in st.session_state:
                    st.session_state.temp_goal_data = {}
                
                st.session_state.temp_goal_data = {
                    "name": goal_name,
                    "category": "Long-Term",
                    "target_amount": float(results['maturity_amount']),
                    "current_savings": float(current_balance),
                    "monthly_savings": float(annual_investment/12),
                    "time_period": int(results['total_years']),
                    "expected_return": float(interest_rate)
                }
                
                # Success message
                st.success("Goal information prepared! Redirecting to goal settings...")
                
                # Use JavaScript to redirect to goal_settings
                js = """
                <script>
                setTimeout(function() {
                    window.parent.location.href = "/goal_settings";
                }, 1500);
                </script>
                """
                st.components.v1.html(js)

if __name__ == "__main__":
    show()