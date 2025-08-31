<!-- ! Phase 1 : To Develope the File and Routes and Design Components and Routing -->

# DevSynergy Project

    - Created a Vite + React Applications
    - Install TailwindCSS
    - Component UI Library : Daisy UI Component Library
    - Add NavBar Component
    - Create a NavBar.jsx Separate Component file
    - SetUp Routing(Files Path) using the Routing Component



# Component Design of Our Appications
    - Body
        - NavBar
        - Routes/  => feed
        - Route/login => Login
        - Route/connections => Connections
        - Route/profile => Profile

# Phase 2
    <!-- ! Phase 2 : -->

# Create a Login Page
    -->Build the UI Of the LOGIN Page Ok
        - IN Developement Phase : 
            - We get the CORS Error but it can be solved using the CORS npm add in the Backend and we add the Config origin and crendentials
            - If Site contain the Cookies then we have to make the {credentials:true} true in backend and {withcrentials:true} in frontend [in productions all it OKS].
    --> Now we use the Redux to Store and Retrive the Data fast in the Client Side...
        configureStore => Provider => createSlice => add Reducer to the Store
            - Create the STORE first 
            - Then we have to Provide this Store to our Applications 
            - Create the Slice or store items and then put these item into the Store
            - How to add and Read the Data into and from the Stores : By using the 
                - Add data to the Redux Store we use the Hook called " useDispatch" bascially we do dispatch and actions
    --> How to still get Login when page is Refresh : 
            - See the Body.js and get the Token informations


# Phase 3 
    - Profile Page and Sigup page is Build using the APIs /signup and "/profile/view"

# Phase 4 : Building the Feed Page 
    - Feed Page : GET "/user/feed" API
        - It is Build with the Interested and Ingnored Features with the API Integrations

# Phase 5 : Building the Connections Request Features 
     - One Request Recieved Component
     1. Total Connections and their Cards : Completed
           - Need the GET /user/connections API   
     2. Now I have to make the Request that I have Recieved from the Other User Ok
           - Need API GET /user/requests/received
           - In this We have the Received Request with Having the Two Options -    
                "accepted", "rejected"  
           - this Accepted and Rejected is done by the API POST /request/review/:status/:requestId
-  


# API call Issue whenever i go to the Pages as I have Already the data into the Redux Stroe why API call again and again

