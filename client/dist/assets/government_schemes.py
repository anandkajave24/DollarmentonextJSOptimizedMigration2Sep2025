import streamlit as st
import pandas as pd
import time

# Cache the schemes data to improve performance
@st.cache_data
def get_scheme_categories():
    print("Loading scheme categories...")
    start_time = time.time()

    categories = {
        "Agriculture & Rural": [
            {
                "name": "Prime Minister Dhan-Dhaanya Krishi Yojana",
                "launch_date": "February 2025",
                "description": "Aims to boost agricultural productivity in 100 districts with low yield. Focuses on improving irrigation, providing better access to credit, and enhancing storage facilities at the panchayat level.",
                "beneficiaries": "Farmers in 100 districts with low agricultural yield",
                "access": "Eligible farmers can apply through local agricultural offices or the official scheme website",
                "source": "TAXUPDATES.CAGURUJICLASSES.COM",
                "website": "https://www.sarkariyojana.com"
            },
            {
                "name": "Mission for Aatmanirbharta in Pulses",
                "description": "Initiated to reduce dependency on pulse imports, this six-year program seeks to increase domestic production of pulses through procurement at guaranteed prices and support for farmers.",
                "beneficiaries": "Pulse farmers aiming to boost domestic production",
                "access": "Farmers can register via the Ministry of Agriculture's portal or contact local agricultural departments",
                "source": "REUTERS.COM",
                "website": "https://www.reuters.com"
            },
            {
                "name": "Comprehensive Programme for Vegetables & Fruits",
                "description": "This program focuses on enhancing the production and supply chain of vegetables and fruits to ensure food security and stabilize prices.",
                "beneficiaries": "Farmers involved in horticulture",
                "access": "Applications are available through state horticulture departments or the program's official website",
                "source": "SARKARIYOJANA.COM",
                "website": "https://www.sarkariyojana.com"
            },
            {
                "name": "National Mission on High Yielding Seeds",
                "description": "Aimed at developing and distributing high-yielding seed varieties to farmers, this mission seeks to improve crop productivity and resilience.",
                "beneficiaries": "Farmers seeking improved seed varieties",
                "access": "Enrollment can be done through local agricultural extension centers or the mission's online platform",
                "source": "REUTERS.COM",
                "website": "https://www.reuters.com"
            },
            {
                "name": "National Mission on Natural Farming",
                "description": "Aims to promote adoption of natural and sustainable farming practices among farmers",
                "beneficiaries": "Farmers adopting natural and sustainable farming practices",
                "access": "Farmers can join training programs and access resources through agricultural extension services",
                "source": "STUDYIQ.COM",
                "website": "https://www.studyiq.com"
            },
            {
                "name": "Livestock Health and Disease Control Programme (LHDCP)",
                "description": "Comprehensive program for improving livestock health and preventing diseases",
                "beneficiaries": "Livestock farmers seeking to improve animal health and prevent diseases",
                "access": "Farmers can avail services through veterinary clinics and agricultural extension offices",
                "source": "STUDYIQ.COM",
                "website": "https://www.studyiq.com"
            }
        ],
        "Health & Wellness": [
            {
                "name": "Samvedana Campaign",
                "description": "Mental health support initiative in Durg, Chhattisgarh",
                "beneficiaries": "Individuals facing mental health challenges, particularly in Durg, Chhattisgarh",
                "access": "Residents can access mental health services through local health centers participating in the campaign",
                "source": "STUDYIQ.COM",
                "website": "https://www.studyiq.com"
            },
            {
                "name": "Ayushman Bharat Digital Mission",
                "description": "This mission aims to create a digital health ecosystem by providing digital health IDs to citizens, facilitating access to medical records and healthcare services.",
                "beneficiaries": "All Indian citizens seeking digital health records",
                "access": "Individuals can create their digital health IDs on the official portal or at participating healthcare facilities",
                "source": "CLEARTAX.IN",
                "website": "https://www.cleartax.in"
            },
            {
                "name": "Ayushman Sahakar Scheme",
                "description": "Support for cooperative societies aiming to establish healthcare infrastructure",
                "beneficiaries": "Cooperative societies aiming to establish healthcare infrastructure",
                "access": "Eligible cooperatives can apply for loans through the National Cooperative Development Corporation's official portal",
                "source": "INSTAPDF.IN",
                "website": "https://www.instapdf.in"
            }
        ],
        "Employment & Social Security": [
            {
                "name": "Stand-Up India Scheme",
                "description": "Provides loans to women and SC/ST entrepreneurs to promote entrepreneurship and economic empowerment",
                "beneficiaries": "Women and SC/ST entrepreneurs",
                "access": "Eligible applicants can apply for loans through the scheme's portal or at designated bank branches",
                "source": "SARKARIYOJANA.COM",
                "website": "https://www.sarkariyojana.com"
            },
            {
                "name": "Pradhan Mantri Shram Yogi Maan-dhan (PM-SYM)",
                "description": "Pension scheme providing benefits to unorganized sector workers",
                "beneficiaries": "Unorganized sector workers seeking pension benefits",
                "access": "Eligible workers can enroll at Common Service Centers (CSCs) or through the scheme's online portal",
                "source": "STUDYIQ.COM",
                "website": "https://www.studyiq.com"
            },
            {
                "name": "PM SVANidhi Scheme",
                "description": "Provides micro-loans to street vendors for business development",
                "beneficiaries": "Street vendors requiring financial assistance",
                "access": "Vendors can apply for micro-loans through urban local bodies or the scheme's online platform",
                "source": "SARKARIYOJANA.COM",
                "website": "https://www.sarkariyojana.com"
            }
        ],
        "Infrastructure & Development": [
            {
                "name": "Jal Jeevan Mission",
                "description": "Extended until 2028, the Jal Jeevan Mission aims to provide potable tap water connections to all rural households, focusing on infrastructure quality and maintenance through community participation",
                "beneficiaries": "Rural households without tap water connections",
                "access": "Residents can approach their Gram Panchayats or visit the mission's website for connection requests",
                "source": "CLEARTAX.IN",
                "website": "https://www.cleartax.in"
            },
            {
                "name": "One Nation One Port (ONOP) Initiative",
                "description": "Initiative to streamline maritime and logistics operations across ports",
                "beneficiaries": "Stakeholders in the maritime and logistics sectors",
                "access": "Participants can engage through the official ONOP platform and associated government agencies",
                "source": "STUDYIQ.COM",
                "website": "https://www.studyiq.com"
            }
        ],
        "Women & Child Development": [
            {
                "name": "Mission Shakti",
                "description": "Comprehensive women empowerment and safety initiative",
                "beneficiaries": "Women seeking empowerment and safety",
                "access": "Women can access support services through local women's help centers and the scheme's official channels",
                "source": "STUDYIQ.COM",
                "website": "https://www.studyiq.com"
            },
            {
                "name": "Pradhan Mantri Poshan Shakti Nirman",
                "description": "Comprehensive nutrition support program for children and women",
                "beneficiaries": "Children and women requiring nutritional support",
                "access": "Beneficiaries can access services through Anganwadi centers and schools participating in the program",
                "source": "INSTAPDF.IN",
                "website": "https://www.instapdf.in"
            },
            {
                "name": "Majhi Ladki Bahin Yojana",
                "description": "Financial support scheme for women in Maharashtra",
                "beneficiaries": "Women in Maharashtra needing financial support",
                "access": "Eligible women can apply through the state's official website or local government offices",
                "source": "SARKARIYOJANA.COM",
                "website": "https://www.sarkariyojana.com"
            },
            {
                "name": "Delhi Mahila Samriddhi Yojana",
                "description": "Financial empowerment scheme for Delhi women residents",
                "beneficiaries": "Women residents of Delhi seeking financial empowerment",
                "access": "Applications are available on the Delhi government's official portal",
                "source": "SARKARIYOJANA.COM",
                "website": "https://www.sarkariyojana.com"
            }
        ],
        "Housing & Social Welfare": [
            {
                "name": "Pradhan Mantri Awas Yojana (Urban & Rural)",
                "description": "Aiming to provide affordable housing to all, this scheme focuses on constructing houses for the urban and rural poor, with subsidies and financial assistance",
                "beneficiaries": "Economically weaker sections needing housing",
                "access": "Applications can be submitted online or through local municipal offices and Gram Panchayats",
                "source": "SARKARIYOJANA.COM",
                "website": "https://www.sarkariyojana.com"
            },
            {
                "name": "Pradhan Mantri Ujjwala Yojana",
                "description": "Aiming to provide clean cooking fuel, this scheme offers free LPG connections to women from below-poverty-line households",
                "beneficiaries": "Women from below-poverty-line households",
                "access": "Applications are accepted at authorized LPG distributors or via the scheme's website",
                "source": "SARKARIYOJANA.COM",
                "website": "https://www.sarkariyojana.com"
            }
        ],
        "Digital & Education": [
            {
                "name": "Digital India Mission",
                "description": "Initiative to transform India into a digitally empowered society and knowledge economy",
                "beneficiaries": "Citizens seeking digital infrastructure and literacy",
                "access": "Various programs can be accessed through common service centers or the Digital India portal",
                "source": "SARKARIYOJANA.COM",
                "website": "https://www.digitalindia.gov.in"
            },
            {
                "name": "PM Internship Scheme",
                "description": "Program providing internship opportunities to enhance skill development",
                "beneficiaries": "Students seeking internships",
                "access": "Eligible students can register on the official internship portal to access opportunities",
                "source": "SARKARIPREP.IN",
                "website": "https://www.sarkariprep.in"
            },
            {
                "name": "Mid-Day Meal Scheme",
                "description": "Program providing nutritional support to school children",
                "beneficiaries": "School children requiring nutritional support",
                "access": "Children receive meals directly at participating schools",
                "source": "STUDYIQ.COM",
                "website": "https://www.studyiq.com"
            }
        ],
        "State-Specific Schemes": [
            {
                "name": "Bana Kaih Scheme Mizoram",
                "description": "Support program for small and marginal entrepreneurs in Mizoram",
                "beneficiaries": "Small and marginal entrepreneurs in Mizoram",
                "access": "Interested entrepreneurs can apply online through the state's official website",
                "source": "SARKARIYOJANA.COM",
                "website": "https://www.sarkariyojana.com"
            }
        ]
    }

    print(f"Scheme categories loaded in {time.time() - start_time:.2f} seconds")
    return categories

def show():
    start_time = time.time()
    print("Starting government schemes page render...")

    st.title("📜 Indian Government Schemes")

    st.write("""
    Explore various government schemes and initiatives designed to promote inclusive growth 
    and development across different sectors in India.
    """)

    # Get cached categories
    categories = get_scheme_categories()
    print(f"Retrieved categories in {time.time() - start_time:.2f} seconds")

    # Search functionality
    search_query = st.text_input("🔍 Search Schemes", placeholder="Enter scheme name or keyword...")

    # Category filter
    selected_category = st.selectbox(
        "Filter by Category",
        ["All Categories"] + list(categories.keys())
    )

    render_start = time.time()
    print("Starting to render schemes...")

    # Display schemes based on filters
    for category, schemes in categories.items():
        if selected_category in ["All Categories", category]:
            # Only show category if it matches search
            show_category = False
            for scheme in schemes:
                if (search_query.lower() in scheme["name"].lower() or 
                    search_query.lower() in scheme["description"].lower() or
                    search_query.lower() in category.lower()):
                    show_category = True
                    break

            if show_category:
                st.header(f"📑 {category}")

                for scheme in schemes:
                    # Check if scheme matches search query
                    if (search_query.lower() in scheme["name"].lower() or 
                        search_query.lower() in scheme["description"].lower()):

                        with st.expander(f"🔸 {scheme['name']}", expanded=False):
                            st.markdown(f"""
                            **Description:**  
                            {scheme['description']}

                            **Beneficiaries:**  
                            {scheme['beneficiaries']}

                            **How to Access:**  
                            {scheme['access']}

                            **Source:** [{scheme['source']}]({scheme['website']})
                            """)

                            # Add application button
                            st.link_button("Visit Official Website", scheme["website"])

    print(f"Schemes rendered in {time.time() - render_start:.2f} seconds")

    # Additional Information
    st.sidebar.title("Quick Links")
    st.sidebar.markdown("""
    ### Important Resources
    - [National Government Portal](https://www.india.gov.in)
    - [MyGov Portal](https://www.mygov.in)
    - [Digital India](https://www.digitalindia.gov.in)
    - [Direct Benefit Transfer](https://dbtbharat.gov.in)
    - [Common Service Centres](https://www.csc.gov.in)

    ### Need Help?
    Visit your nearest Common Service Centre (CSC) for assistance with scheme applications
    or contact the respective department through their official website.
    """)

    # Scheme Statistics
    st.sidebar.title("Scheme Statistics")
    total_schemes = sum(len(schemes) for schemes in categories.values())
    st.sidebar.metric("Total Schemes", total_schemes)

    # Categories breakdown
    st.sidebar.markdown("### Categories Breakdown")
    for category, schemes in categories.items():
        st.sidebar.text(f"• {category}: {len(schemes)}")

    print(f"Total page render time: {time.time() - start_time:.2f} seconds")

if __name__ == "__main__":
    show()