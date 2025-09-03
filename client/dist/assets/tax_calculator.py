import streamlit as st
import pandas as pd
import plotly.express as px
from utils.navigation import create_breadcrumb
from utils.pdf_generator import generate_tax_report
from utils.tax_data_manager import TaxDataManager
import base64
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def get_pdf_download_link(pdf_bytes, filename):
    """Generate a link that allows downloading the PDF file"""
    b64 = base64.b64encode(pdf_bytes).decode()
    return f'<a href="data:application/pdf;base64,{b64}" download="{filename}">Download PDF Report</a>'

def calculate_tax_old_regime(taxable_income):
    """Calculate tax under old regime"""
    if taxable_income <= 250000:
        return 0
    elif taxable_income <= 500000:
        tax = (taxable_income - 250000) * 0.05
    elif taxable_income <= 1000000:
        tax = 12500 + (taxable_income - 500000) * 0.20
    else:
        tax = 112500 + (taxable_income - 1000000) * 0.30

    # Add health and education cess
    cess = tax * 0.04
    return tax + cess

def calculate_tax_new_regime(taxable_income):
    """Calculate tax under new regime"""
    if taxable_income <= 300000:
        return 0
    elif taxable_income <= 600000:
        tax = (taxable_income - 300000) * 0.05
    elif taxable_income <= 900000:
        tax = 15000 + (taxable_income - 600000) * 0.10
    elif taxable_income <= 1200000:
        tax = 45000 + (taxable_income - 900000) * 0.15
    elif taxable_income <= 1500000:
        tax = 90000 + (taxable_income - 1200000) * 0.20
    else:
        tax = 150000 + (taxable_income - 1500000) * 0.30

    # Add health and education cess
    cess = tax * 0.04
    return tax + cess

def save_tax_data(data_manager, tax_data):
    """Save tax calculation data and update connected features"""
    try:
        if data_manager.save_tax_calculation(tax_data):
            st.success("✅ Tax data saved and synced with connected features!")

            # Show integration updates
            with st.expander("🔄 Feature Updates", expanded=True):
                col1, col2 = st.columns(2)
                with col1:
                    st.info("🎯 Tax Harvesting: Updated strategies")
                    st.info("📊 Government Schemes: Recalculated benefits")
                with col2:
                    st.info("🎯 Financial Goals: Updated tax planning")

            logger.info("Tax data saved and synced successfully")
            return True
        else:
            st.error("Failed to save tax data")
            logger.error("Failed to save tax data")
            return False
    except Exception as e:
        st.error(f"Error saving tax data: {str(e)}")
        logger.error(f"Error saving tax data: {str(e)}")
        return False

def show_connected_features(data_manager):
    """Display connected features sidebar"""
    try:
        st.sidebar.markdown("### 🔗 Connected Features")

        # Tax Harvesting Integration
        st.sidebar.markdown("#### 📊 Tax Harvesting")
        harvesting_data = data_manager.export_data_for_harvesting()
        if harvesting_data:
            st.sidebar.metric(
                "Current Tax Liability",
                f"₹{harvesting_data.get('current_tax_liability', 0):,.2f}",
                help="Your current tax liability"
            )
            st.sidebar.metric(
                "Potential Tax Savings",
                f"₹{harvesting_data.get('potential_tax_savings', 0):,.2f}",
                help="Potential tax savings through harvesting"
            )
        else:
            st.sidebar.info("Calculate your tax to see harvesting opportunities")

        # Government Schemes Integration
        st.sidebar.markdown("#### 🏛️ Government Schemes")
        try:
            schemes_data = data_manager.export_for_government_schemes()
            if schemes_data and isinstance(schemes_data, dict):
                st.sidebar.metric(
                    "Available Benefits",
                    f"₹{schemes_data.get('total_benefits', 0):,.2f}",
                    help="Total available benefits from schemes"
                )
                eligible_schemes = schemes_data.get('eligible_schemes', [])
                if eligible_schemes:
                    st.sidebar.markdown("**Eligible Schemes:**")
                    for scheme in eligible_schemes[:3]:  # Show top 3
                        st.sidebar.markdown(f"- {scheme}")
            else:
                st.sidebar.info("Complete tax calculation to view eligible schemes")
        except Exception as e:
            logger.error(f"Error loading government schemes data: {str(e)}")
            st.sidebar.info("Government schemes data will appear after tax calculation")

        # Goal Settings Integration
        st.sidebar.markdown("#### 🎯 Financial Goals")
        try:
            goals_data = data_manager.export_data_for_goals()
            if goals_data and isinstance(goals_data, dict):
                st.sidebar.metric(
                    "Tax Savings Progress",
                    f"₹{goals_data.get('tax_savings_achieved', 0):,.2f}",
                    help="Tax savings achieved so far"
                )
            else:
                st.sidebar.info("Set financial goals to track tax savings progress")
        except Exception as e:
            logger.error(f"Error loading goals data: {str(e)}")
            st.sidebar.info("Financial goals data will appear after setting goals")

        # Quick Links
        st.sidebar.markdown("### 🔗 Quick Access")
        st.sidebar.markdown("""
        - [📊 Tax Harvesting](/tax_harvesting)
        - [🏛️ Government Schemes](/government_schemes)
        - [🎯 Goal Settings](/goal_settings)
        """)

        st.sidebar.markdown("---")
        st.sidebar.info("""
        💡 **Pro Tip:** Your tax calculations are automatically shared with these 
        features to provide personalized recommendations and optimize your financial planning.
        """)

    except Exception as e:
        logger.error(f"Error displaying connected features: {str(e)}")
        st.sidebar.warning("""
        Unable to load connected features at the moment. 
        Please try calculating your tax again.
        """)

def show():
    # Add breadcrumb navigation
    create_breadcrumb(
        "Tax Calculator",
        [{"name": "Tools", "link": "#"}]
    )

    st.title("💸 Comprehensive Tax Savings Calculator")

    # Initialize data manager
    try:
        data_manager = TaxDataManager()
        logger.info("TaxDataManager initialized successfully")
    except Exception as e:
        st.error("Failed to initialize tax data manager")
        logger.error(f"Error initializing TaxDataManager: {str(e)}")
        return

    # Show connected features in sidebar
    show_connected_features(data_manager)

    st.write("""
    Calculate your income tax liability and explore all available tax-saving options in India.
    Compare between old and new tax regimes to make informed decisions.
    """)

    st.warning("""
    **Important Disclaimer:** 
    - Tax calculations are based on current tax laws which may change
    - Investment-related tax savings assume historical performance
    - Past performance of investment instruments does not guarantee future returns
    - This calculator is for educational purposes only
    - Consult qualified tax and financial advisors for personalized advice
    """)

    # Income Details
    st.header("1️⃣ Income Details")
    col1, col2 = st.columns(2)

    with col1:
        gross_salary = st.number_input(
            "Annual Gross Salary (₹)",
            min_value=0,
            value=500000,
            step=10000,
            help="Total annual salary before any deductions [Learn More](/documentation/income_sources)"
        )

        other_income = st.number_input(
            "Other Income (₹)",
            min_value=0,
            value=0,
            step=1000,
            help="Rental income, interest, capital gains, etc."
        )

    with col2:
        st.info("""
        💡 **Income Tips**
        - Include all sources of income
        - Consider rental income, interest, dividends
        - Include capital gains if any
        - Don't forget income from previous employer
        """)

    # Section 80C Deductions
    st.header("2️⃣ Section 80C Deductions (Max ₹1.5 Lakh)")

    tab1, tab2, tab3 = st.tabs(["Investments", "Insurance", "Other Deductions"])

    with tab1:
        st.markdown("""
        ### Tax-Saving SIPs & Mutual Funds
        Only ELSS (Equity Linked Savings Scheme) mutual funds are eligible for tax deduction under Section 80C.
        Regular SIPs in non-ELSS mutual funds are not eligible for tax deduction.
        """)
        
        with st.expander("📋 List of Popular ELSS Funds Eligible for Tax Savings", expanded=True):
            st.markdown("""
            The following ELSS mutual funds are eligible for tax deduction under Section 80C:
            
            | Fund Name | Category | Lock-in Period | Min. SIP Amount |
            |-----------|----------|---------------|----------------|
            | Axis Long Term Equity Fund | ELSS | 3 years | ₹500/month |
            | DSP Tax Saver Fund | ELSS | 3 years | ₹500/month |
            | Mirae Asset Tax Saver Fund | ELSS | 3 years | ₹500/month |
            | Nippon India Tax Saver Fund | ELSS | 3 years | ₹500/month |
            | SBI Long Term Equity Fund | ELSS | 3 years | ₹500/month |
            | Tata India Tax Savings Fund | ELSS | 3 years | ₹500/month |
            | Quant Tax Plan | ELSS | 3 years | ₹500/month |
            | Canara Robeco Equity Tax Saver | ELSS | 3 years | ₹1,000/month |
            | HDFC Tax Saver | ELSS | 3 years | ₹500/month |
            | ICICI Prudential Long Term Equity Fund | ELSS | 3 years | ₹500/month |
            
            **Note:** All ELSS funds have a mandatory lock-in period of 3 years.
            """)
            
            st.warning("""
            ⚠️ **Important:**
            - Only ELSS mutual funds qualify for tax deduction under Section 80C
            - Regular equity, debt, balanced, or index funds do NOT qualify for tax deduction
            - Direct plans have lower expense ratios than regular plans
            - The maximum deduction under Section 80C is ₹1.5 lakh per financial year (combined with other eligible investments)
            - Past performance does not guarantee future returns
            """)
        
        col1, col2 = st.columns(2)
        with col1:
            ppf_investment = st.number_input(
                "PPF Investment",
                min_value=0,
                max_value=150000,
                value=0,
                help="Public Provident Fund investment"
            )

            elss_investment = st.number_input(
                "ELSS Mutual Funds",
                min_value=0,
                value=0,
                help="Equity Linked Savings Scheme investment - Only ELSS SIPs qualify for tax deduction"
            )

            sukanya_investment = st.number_input(
                "Sukanya Samriddhi Yojana",
                min_value=0,
                value=0,
                help="For girl child education and marriage"
            )

        with col2:
            st.info("""
            💡 **Investment Tips**
            - PPF: Long-term tax-free returns (15-year lock-in)
            - ELSS Mutual Funds: 
              * Only tax-saving mutual fund category
              * Lowest lock-in of 3 years
              * Potential for higher returns
            - NSC: Government backed security
            - SSY: Highest interest rate for girl child
            """)

    with tab2:
        col1, col2 = st.columns(2)
        with col1:
            life_insurance = st.number_input(
                "Life Insurance Premium",
                min_value=0,
                value=0,
                help="Life insurance premium paid"
            )

            ulip_investment = st.number_input(
                "ULIP Investment",
                min_value=0,
                value=0,
                help="Unit Linked Insurance Plan investment"
            )

        with col2:
            st.info("""
            💡 **Insurance Tips**
            - Life Insurance: Choose term plans for better coverage
            - ULIPs: Consider lock-in period and charges
            - Premium should not exceed 10% of sum assured
            """)

    with tab3:
        col1, col2 = st.columns(2)
        with col1:
            home_loan_principal = st.number_input(
                "Home Loan Principal",
                min_value=0,
                value=0,
                help="Principal repayment of home loan"
            )

            tuition_fees = st.number_input(
                "Children Tuition Fees",
                min_value=0,
                value=0,
                help="Tuition fees for up to 2 children"
            )

            fd_investment = st.number_input(
                "Tax Saving FD (5 years)",
                min_value=0,
                value=0,
                help="5-year tax saving fixed deposit"
            )

        with col2:
            st.info("""
            💡 **Deduction Tips**
            - Home Loan: Principal repayment qualifies
            - Tuition Fees: Only for full-time courses
            - Tax Saving FD: 5-year lock-in required
            """)

    # Additional Tax Benefits
    st.header("3️⃣ Additional Tax Benefits")

    tab1, tab2, tab3, tab4, tab5 = st.tabs(["Health & Education", "Home Loan", "Special Deductions", "Other Benefits", "Stock Market & Trading"])

    with tab1:
        col1, col2 = st.columns(2)
        with col1:
            health_insurance = st.number_input(
                "Health Insurance Premium (80D)",
                min_value=0,
                value=0,
                help="Health insurance premium for self and family"
            )

            preventive_health_checkup = st.number_input(
                "Preventive Health Checkup",
                min_value=0,
                max_value=5000,
                value=0,
                help="Expenses on preventive health checkup"
            )

            education_loan = st.number_input(
                "Education Loan Interest (80E)",
                min_value=0,
                value=0,
                help="Interest paid on education loan"
            )

        with col2:
            st.info("""
            💡 **Health & Education Tips**
            - Health Insurance (80D):
              * Self & Family: Up to ₹25,000
              * Parents below 60: Additional ₹25,000
              * Senior Parents: Additional ₹50,000
            - Preventive Health Checkup: Max ₹5,000
            - Education Loan: Entire interest deductible
            """)

    with tab2:
        col1, col2 = st.columns(2)
        with col1:
            home_loan_interest = st.number_input(
                "Home Loan Interest (24b)",
                min_value=0,
                value=0,
                help="Interest paid on home loan"
            )

            property_rent = st.number_input(
                "House Rent Paid (HRA)",
                min_value=0,
                value=0,
                help="Annual house rent paid"
            )

        with col2:
            st.info("""
            💡 **Home Loan Tips**
            - Interest up to ₹2 lakh for self-occupied
            - Additional ₹50,000 for first-time buyers
            - HRA exemption based on:
              * Actual HRA received
              * 50% of salary (Metro) / 40% (Non-metro)
              * Actual rent paid minus 10% of salary
            """)

    with tab3:
        col1, col2 = st.columns(2)
        with col1:
            infra_bonds = st.number_input(
                "Infrastructure Bonds (80CCF)",
                min_value=0,
                max_value=500000,
                value=0,
                help="Investment in NHAI/REC bonds"
            )

            scss_investment = st.number_input(
                "Senior Citizen Savings Scheme",
                min_value=0,
                value=0,
                help="Investment in SCSS (for senior citizens)"
            )

            capital_gains_bonds = st.number_input(
                "Capital Gains Bonds (54EC)",
                min_value=0,
                value=0,
                help="Investment in specified bonds to save capital gains tax"
            )

            stamp_duty = st.number_input(
                "Stamp Duty & Registration",
                min_value=0,
                value=0,
                help="Stamp duty and registration charges for home purchase"
            )

            disability_deduction = st.number_input(
                "Disability Deduction (80U/80DD)",
                min_value=0,
                value=0,
                help="Deductions available for differently-abled individuals"
            )

        with col2:
            st.info("""
            💡 **Special Deductions Tips**
            - Infrastructure Bonds: Lock-in period applies
            - SCSS: Only for senior citizens (60+ years)
            - Capital Gains Bonds: 
              * 5-year lock-in period
              * Must invest within 6 months
            - Stamp Duty: Qualifies under 80C
            - Disability Deduction:
              * Fixed deduction based on disability %
              * Medical certificate required
            """)

    with tab4:
        col1, col2 = st.columns(2)
        with col1:
            nps_investment = st.number_input(
                "NPS Investment (80CCD)",
                min_value=0,
                value=0,
                help="National Pension System contribution"
            )

            donations = st.number_input(
                "Donations (80G)",
                min_value=0,
                value=0,
                help="Donations to approved institutions"
            )

            interest_savings = st.number_input(
                "Savings Account Interest (80TTA)",
                min_value=0,
                max_value=10000,
                value=0,
                help="Interest earned on savings account"
            )

        with col2:
            st.info("""
            💡 **Additional Benefits Tips**
            - NPS: Extra ₹50,000 under 80CCD(1B)
            - Donations: 50% or 100% deduction
            - Savings Interest: Up to ₹10,000
            - Senior Citizens:
              * Higher basic exemption
              * Higher health insurance limits
              * Special FD scheme
            """)

    with tab5:
        st.markdown("""
        ### Tax Implications of SIPs & Mutual Funds
        """)
        
        with st.expander("📊 Mutual Fund SIPs & Tax Treatment", expanded=True):
            st.markdown("""
            ### Regular SIPs & Mutual Funds (Non-ELSS)
            
            Regular SIPs in non-ELSS mutual funds **do not qualify for tax deduction** under Section 80C, but have the following tax implications:
            
            | Fund Type | Holding Period | Tax Rate | 
            |-----------|----------------|----------|
            | Equity Funds (<65% equity) | < 1 year | As per income tax slab rate |
            | Equity Funds (<65% equity) | > 1 year | 10% on gains above ₹1 lakh (LTCG) |
            | Debt Funds | < 3 years | As per income tax slab rate |
            | Debt Funds | > 3 years | 20% with indexation benefit |
            
            **Note:** The Finance Act 2023 removed indexation benefits on debt mutual funds purchased after April 1, 2023, and now they're taxed at your income tax slab rate regardless of holding period.
            
            ### Dividend vs. Growth Option
            - **Dividend option:** Dividends are taxed in your hands as per your income tax slab rate
            - **Growth option:** Only taxed when you redeem based on holding period
            
            ### Tax-Saving ELSS Mutual Funds
            - Eligible for tax deduction under Section 80C (up to ₹1.5 lakh)
            - 3-year mandatory lock-in period
            - After lock-in, gains taxed like regular equity mutual funds (10% LTCG tax on gains above ₹1 lakh)
            """)
            
            st.warning("""
            ⚠️ **Important Tax Considerations:**
            1. Only ELSS mutual funds qualify for tax deduction under Section 80C
            2. Regular SIPs in equity/debt/hybrid/index funds don't qualify for tax deduction
            3. Each SIP installment has its own lock-in and holding period
            4. STT (Securities Transaction Tax) is automatically deducted on redemption
            5. Past performance does not guarantee future returns
            """)
        
        col1, col2 = st.columns(2)
        with col1:
            short_term_loss = st.number_input(
                "Short-term Capital Loss",
                min_value=0,
                value=0,
                help="Loss from selling stocks/mutual funds held for less than 1 year"
            )

            long_term_loss = st.number_input(
                "Long-term Capital Loss",
                min_value=0,
                value=0,
                help="Loss from selling stocks/mutual funds held for more than 1 year"
            )

            intraday_loss = st.number_input(
                "Intraday Trading Loss",
                min_value=0,
                value=0,
                help="Loss from same-day trading"
            )

            fo_loss = st.number_input(
                "F&O Trading Loss",
                min_value=0,
                value=0,
                help="Loss from futures and options trading"
            )
            
            mutual_fund_stcg = st.number_input(
                "Mutual Fund Short-term Gains",
                min_value=0,
                value=0,
                help="Gains from selling mutual funds held for less than applicable period"
            )

        with col2:
            st.info("""
            💡 **Trading & Mutual Fund Tax Tips**
            
            **Capital Losses:**
            - Short-term losses can be set off against both STCG and LTCG
            - Long-term losses can only be set off against LTCG
            - Intraday and F&O losses are considered speculative business loss
            - Losses can be carried forward for up to 8 assessment years
            
            **Mutual Fund SIPs:**
            - Each SIP installment is a separate investment with its own holding period
            - FIFO (First In First Out) method is used for redemption
            - Consider tax implications before redemption
            - Systematic Transfer Plans (STPs) can help optimize taxes
            - Systematic Withdrawal Plans (SWPs) can provide tax-efficient regular income
            """)

    if st.button("Calculate Tax Liability", type="primary"):
        # Calculate total income
        total_income = gross_salary + other_income

        # Calculate total 80C deductions including new items
        total_80c = min(150000, sum([
            ppf_investment,
            elss_investment,
            sukanya_investment,
            life_insurance,
            ulip_investment,
            home_loan_principal,
            tuition_fees,
            fd_investment,
            stamp_duty  # Added stamp duty under 80C
        ]))

        # Calculate special deductions
        special_deductions = sum([
            infra_bonds,  # 80CCF
            capital_gains_bonds,  # 54EC
            disability_deduction  # 80U/80DD
        ])

        # Calculate additional deductions
        total_health_premium = min(health_insurance + preventive_health_checkup, 25000)  # Basic limit
        total_home_loan = min(home_loan_interest, 200000)  # 24b limit
        total_nps = min(nps_investment, 50000)  # Additional NPS deduction
        total_donations = min(donations * 0.5, 10000)  # 50% of donations up to 10000
        total_savings_interest = min(interest_savings, 10000)  # 80TTA limit

        additional_deductions = sum([
            total_health_premium,
            total_home_loan,
            education_loan,
            total_nps,
            total_donations,
            total_savings_interest,
            special_deductions
        ])

        # Calculate taxable income under old regime
        old_regime_taxable = total_income - total_80c - additional_deductions
        old_regime_tax = calculate_tax_old_regime(old_regime_taxable)

        # Calculate taxable income under new regime
        new_regime_tax = calculate_tax_new_regime(total_income)

        # Display Results
        st.header("Tax Calculation Summary")
        col1, col2 = st.columns(2)

        with col1:
            st.subheader("Old Tax Regime")
            st.metric(
                "Taxable Income",
                f"₹{old_regime_taxable:,.2f}",
                f"-₹{(total_income - old_regime_taxable):,.2f}"
            )
            st.metric(
                "Tax Liability",
                f"₹{old_regime_tax:,.2f}"
            )

        with col2:
            st.subheader("New Tax Regime")
            st.metric(
                "Taxable Income",
                f"₹{total_income:,.2f}"
            )
            st.metric(
                "Tax Liability",
                f"₹{new_regime_tax:,.2f}"
            )

        # Calculate total possible savings
        total_possible_savings = 0
        savings_breakdown = []

        # Check remaining 80C potential
        remaining_80c = 150000 - total_80c
        if remaining_80c > 0:
            total_possible_savings += remaining_80c * 0.3  # Assuming highest tax bracket
            savings_breakdown.append({
                'Category': 'Section 80C',
                'Potential Savings': remaining_80c * 0.3,
                'Investment Required': remaining_80c
            })

        # Check health insurance potential
        if health_insurance == 0:
            potential_health_saving = 25000 * 0.3  # Basic health insurance limit
            total_possible_savings += potential_health_saving
            savings_breakdown.append({
                'Category': 'Health Insurance (80D)',
                'Potential Savings': potential_health_saving,
                'Investment Required': 25000
            })

        # Check NPS potential
        remaining_nps = 50000 - nps_investment
        if remaining_nps > 0:
            total_possible_savings += remaining_nps * 0.3
            savings_breakdown.append({
                'Category': 'NPS Additional (80CCD)',
                'Potential Savings': remaining_nps * 0.3,
                'Investment Required': remaining_nps
            })

        # Create interactive popup for savings
        with st.expander("💰 View Your Potential Tax Savings", expanded=True):
            st.markdown(f"""
            ### Tax Savings Analysis

            Current Status:
            - Tax in Old Regime: ₹{old_regime_tax:,.2f}
            - Tax in New Regime: ₹{new_regime_tax:,.2f}
            - Current Tax Saving: ₹{abs(old_regime_tax - new_regime_tax):,.2f}
            """)

            if total_possible_savings > 0:
                st.success(f"""
                #### 💫 Additional Savings Potential
                You can save up to ₹{total_possible_savings:,.2f} more in tax by optimizing your investments!
                """)

                st.warning("""
                **Investment-Related Tax Savings Disclaimer:**
                - The projected tax savings through investments are estimates
                - Investment returns can vary significantly based on market conditions
                - Past performance does not guarantee future returns
                - Different investment options carry different levels of risk
                - Consider your risk tolerance and financial goals before investing
                - Consult a financial advisor for personalized investment advice
                """)

                # Create a detailed breakdown of potential savings
                savings_df = pd.DataFrame(savings_breakdown)

                # Display as a styled table
                st.write("#### Savings Breakdown")
                st.dataframe(
                    savings_df.style.format({
                        'Potential Savings': '₹{:,.2f}',
                        'Investment Required': '₹{:,.2f}'
                    })
                )

                # Create a visual representation of savings potential
                fig = px.bar(
                    savings_df,
                    x='Category',
                    y='Potential Savings',
                    title='Potential Tax Savings by Category',
                    color='Category',
                    text=savings_df['Potential Savings'].apply(lambda x: f'₹{x:,.2f}')
                )

                fig.update_layout(
                    showlegend=False,
                    yaxis_title="Potential Savings (₹)"
                )

                st.plotly_chart(fig, use_container_width=True)

                # Add actionable recommendations
                st.info("""
                #### 🎯 Quick Actions to Save Tax:
                1. **Max out your 80C**: Invest in ELSS funds or PPF
                2. **Health Insurance**: Get coverage for yourself and family
                3. **NPS Investment**: Additional tax benefit under 80CCD(1B)
                """)
            else:
                st.success("""
                #### 🌟 Congratulations!
                You've optimized your tax savings well. Keep maintaining your current investment strategy.
                """)


        # Create comparison visualization
        tax_comparison = pd.DataFrame({
            'Regime': ['Old Regime', 'New Regime'],
            'Tax': [old_regime_tax, new_regime_tax]
        })

        fig = px.bar(
            tax_comparison,
            x='Regime',
            y='Tax',
            title='Tax Liability Comparison',
            color='Regime',
            text=tax_comparison['Tax'].apply(lambda x: f'₹{x:,.2f}')
        )

        fig.update_layout(
            yaxis_title="Tax Amount (₹)",
            showlegend=False
        )

        st.plotly_chart(fig, use_container_width=True)

        # Display Detailed Breakdown
        st.header("Detailed Tax Analysis")

        # Income Analysis
        st.subheader("Income Breakdown")
        st.markdown(f"""
        - Gross Total Income: ₹{total_income:,.2f}
            * Salary Income: ₹{gross_salary:,.2f}
            * Other Income: ₹{other_income:,.2f}
        """)

        # Deductions Analysis
        st.subheader("Deductions Utilized (Old Regime)")
        col1, col2, col3 = st.columns(3)

        with col1:
            st.markdown(f"""
            **Section 80C (₹{total_80c:,.2f})**
            - PPF: ₹{ppf_investment:,.2f}
            - ELSS: ₹{elss_investment:,.2f}
            - Life Insurance: ₹{life_insurance:,.2f}
            - ULIP: ₹{ulip_investment:,.2f}
            - Home Loan Principal: ₹{home_loan_principal:,.2f}
            - Tuition Fees: ₹{tuition_fees:,.2f}
            - Tax Saving FD: ₹{fd_investment:,.2f}
            - Stamp Duty: ₹{stamp_duty:,.2f}
            """)

        with col2:
            st.markdown(f"""
            **Special Deductions**
            - Infrastructure Bonds: ₹{infra_bonds:,.2f}
            - SCSS Investment: ₹{scss_investment:,.2f}
            - Capital Gains Bonds: ₹{capital_gains_bonds:,.2f}
            - Disability Deduction: ₹{disability_deduction:,.2f}
            """)

        with col3:
            st.markdown(f"""
            **Other Deductions**
            - Health Insurance (80D): ₹{total_health_premium:,.2f}
            - Home Loan Interest: ₹{total_home_loan:,.2f}
            - Education Loan Interest: ₹{education_loan:,.2f}
            - NPS Additional: ₹{total_nps:,.2f}
            - Donations: ₹{total_donations:,.2f}
            - Savings Interest: ₹{total_savings_interest:,.2f}
            """)

        # Tax Saving Recommendations
        st.header("Personalized Tax Saving Recommendations")

        remaining_80c = 150000 - total_80c
        if remaining_80c > 0:
            st.warning(f"""
            💡 **80C Optimization Opportunity**
            You can save additional tax by investing ₹{remaining_80c:,.2f} more under Section 80C.
            Recommended options:
            - ELSS Mutual Funds (3-year lock-in)
            - PPF (long-term tax-free returns)
            - Tax Saving FD (if you prefer fixed returns)
            """)

        if health_insurance == 0:
            st.warning("""
            💡 **Health Insurance Recommendation**
            Consider buying health insurance for:
            - Tax benefits under Section 80D
            - Financial protection against medical emergencies
            - Additional deduction for parents' health insurance
            """)

        if nps_investment < 50000:
            st.warning(f"""
            💡 **NPS Investment Opportunity**
            You can get additional tax benefit of up to ₹{50000 - nps_investment:,.2f} by investing in NPS under Section 80CCD(1B).
            """)

        # Final Recommendation
        better_regime = "Old" if old_regime_tax < new_regime_tax else "New"
        tax_difference = abs(old_regime_tax - new_regime_tax)

        st.success(f"""
        🎯 **Final Recommendation**
        - The {better_regime} Tax Regime is better for you
        - Tax saving: ₹{tax_difference:,.2f}
        - Total deductions utilized: ₹{(total_income - old_regime_taxable):,.2f}
        """)

        # Generate PDF Report
        tax_data = {
            'total_income': total_income,
            'old_regime_taxable': old_regime_taxable,
            'old_regime_tax': old_regime_tax,
            'new_regime_tax': new_regime_tax,
            'total_80c': total_80c,
            'total_health_premium': total_health_premium,
            'total_home_loan': total_home_loan,
            'education_loan': education_loan,
            'total_nps': total_nps,
            'total_donations': total_donations,
            'total_savings_interest': total_savings_interest,
            'special_deductions': special_deductions,
            'tax_saved': abs(old_regime_tax - new_regime_tax),
            'better_regime': 'Old' if old_regime_tax < new_regime_tax else 'New'
        }

        # Save and sync data
        save_tax_data(data_manager, tax_data)

        pdf_bytes = generate_tax_report(tax_data)
        st.markdown(
            get_pdf_download_link(pdf_bytes, "tax_analysis_report.pdf"),
            unsafe_allow_html=True
        )

if __name__ == "__main__":
    show()