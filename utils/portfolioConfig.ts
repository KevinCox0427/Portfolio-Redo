declare global {
    type PortfolioConfig = {
        name: string
        route: string,
        description: string[],
        problem: string[],
        solution: string[],
        logo: string,
        tag: string,
        skills: string[],
        link?: string,
        gallery: string[]
    }
}

const portfolioConfig: PortfolioConfig[] = [
    {
        name: "New York Land Quest",
        route: "newyorklandquest",
        description: [
            "A New York based real estate company that specializes in selling large plots of land in upstate New York. They also provide a platform for users' plots of land to be evaluated and sold. These range from campgrounds in the Adirondacks, to farmland in the Catskills, to getaway vacation homes in the Finger Lakes. Their slogan - \"Selling Land is Our Specialty — Selling All Types of Real Estate is Our Business\""
        ],
        logo: "https://nylandquest.com/wp-content/uploads/sites/12/2023/01/nylq_logo.png",
        problem: [
            "This client had a previous Wordpress build that wanted to update the look of and scale their current operations, however it was entirely \"Drag-and-Drop\" and \"Plugin\" based so it was fundamentally rigid, unstable, and slow. Their previous site saw a lot of content sprawl, and its layout was confusing to end users. They had amassed a large SQL database that was slow in its queries, and they wanted some flexibility in their data structures to be able to add onto."
        ],
        solution: [
            "Since the client wanted a radical shift in their front-end AND back-end, I took this opportunity to re-develop the entire project in PHP as far away from the Wordpress framework as possible. I also re-designed / mocked it up alongside them to make sure they understood and approved exactly what they were getting.", 
            "To reduce content sprawl and confusion, I consolidated all their digital operations into two pages, a \"Buy\" page, a map-based UI with 10 filtering options to search for every listing, and \"Sold\" page, a standardized form to provide a single source of intake for new listings. To tackle the server side, I immediately removed all \"Plugins\" from the site, only migrated the SQL database responsible for their listings and agents, and cleaned up the schemas."
        ],
        skills: ['PHP', 'UI / UX Design', 'TypeScript', 'MySQL', 'SASS', 'Leaflet.js'],
        tag: "Web Development",
        link: "https://nylandquest.com",
        gallery: ["https://dreamstateospublic.s3.us-east-2.amazonaws.com/portfolio/nylq/New_York_Land_Quest.jpg", "https://dreamstateospublic.s3.us-east-2.amazonaws.com/portfolio/nylq/New_York_Land_Quest_Buy.jpg", "https://dreamstateospublic.s3.us-east-2.amazonaws.com/portfolio/nylq/New_York_Land_Quest_Listing.jpg", "https://dreamstateospublic.s3.us-east-2.amazonaws.com/portfolio/nylq/New_York_Land_Quest_Sell.jpg", "https://dreamstateospublic.s3.us-east-2.amazonaws.com/portfolio/nylq/New_York_Land_Quest_About.jpg"]
    },
    {
        name: "Red Barn HPC",
        route: "redbarnhpc",
        description: [
            "A high performance computing company based out of Binghamton, New York. This company assesses project requirements for high performance computing, builds the hardware, and installs the software, typically for scientific institutions such as Cornell University, Cold Spring Harbor Laboratory, and the US Airforce. Their slogan: \"We build the servers behind the science.\""
        ],
        logo: "https://dreamstateospublic.s3.us-east-2.amazonaws.com/portfolio/hpc/hpc.webp",
        problem: [
            "This client's previous website was a \"Drag and Drop\" and \"Plugin\" based Wordpress site, and as they scaled their company, the website had fallen into disrepair. Through neglect and out of control project scope, the site had many dependencies conflicting, as well as severely unoptimized code, causing consistent crashing. The client requested a repaired site with a much cleaner front-end and a configurator for end users to customize their servers and submit it as an inquiry."
        ],
        solution: [
            "The first thing I did was make a staging site, migrated the build, deleted all the \"Plugins\" (except for WooCommerce at the client's request), and migrated only the necessary SQL databases. Then I cleaned up the schemas, and created Object-Oriented controllers for optimized queries, which immediately improved the site's performance by ~500%.",
            "Then, I re-designed and re-developed the entire front-end to be much more legible and consistent. I created some banner graphics as well to create an aesthetically pleasing landing page. I also developed a new configuration UI for their products, similar to something like PC Part Picker, which instantly saw use after launch. Finally, I recreated their forms for their support and quotes, and opened up all the necessary endpoints to make it all function."
        ],
        skills: ["PHP", "UI / UX Design", "Typescript", "SASS", "MySQL", "Vector Graphics"],
        tag: "Web Development",
        link: "https://redbarnhpc.com/",
        gallery: ['https://dreamstateospublic.s3.us-east-2.amazonaws.com/portfolio/hpc/Red Barn HPC.jpg', 'https://dreamstateospublic.s3.us-east-2.amazonaws.com/portfolio/hpc/Red Barn HPC Products.jpg', 'https://dreamstateospublic.s3.us-east-2.amazonaws.com/portfolio/hpc/Red Barn HPC Configurator.jpg', 'https://dreamstateospublic.s3.us-east-2.amazonaws.com/portfolio/hpc/Red Barn HPC Support.jpg', 'https://dreamstateospublic.s3.us-east-2.amazonaws.com/portfolio/hpc/Red Barn HPC Quote.jpg', 'https://dreamstateospublic.s3.us-east-2.amazonaws.com/portfolio/hpc/Red Barn HPC Customers.jpg', 'https://dreamstateospublic.s3.us-east-2.amazonaws.com/portfolio/hpc/Red Barn HPC Testimonials.jpg']
    },
    {
        name: "High Atlas Foundation",
        route: "highatlasfoundation",
        description: [
            "A non-profit organization based of out Morocco founded by a few Peace Corps volunteers. They primarily contribute to sustainable agriculture, school infrastructure, clean water infrastructure, environmental management, and women's empowerment. Their mission: \"HAF supports Moroccan communities to take action in implementing human development initiatives. HAF promotes organic agriculture, women's empowerment, youth development, education, and health.\""
        ],
        logo: "https://dreamstateospublic.s3.us-east-2.amazonaws.com/portfolio/haf/haf.png",
        problem: [
            "This client wanted to expand into carbon crediting through their tree nurseries. They had contacted a PHD student from Germany to create an algorithm that calculates the ogranic carbon for a given tree nursery's planting output. I was responsible for converting these scientific alogrithms into a web-based prototype.",
            "Seems fairly straightforward, however the sheer amount of geological data used in these algorithms proved to be an interesting project. Most of the work was converting such data from \"R\" scripts into a Node.js server. This consisted of a few excel sheets and 6 numeric matrices representing geological map data. Each matrix had different sizes, areas, and indices. And to top it all off, they were stored as .TIF images, which is an encoded format, and therefore useless for any real-time mathematical operations."
        ],
        solution: [
            "First, I had to learn R to decode all of these images into 2-D arrays, since the C#, JS, and Python libraries I tried couldn't do so. Due to the variety of the maps, I had to use R again to figure out what part of the globe each one covered, as well as the delta change of its indices. Based on these values, I then calculated which sections of the matrices I needed to just cover Morocco, cut them out, and stored all this information as metadata to be used in the SQL queries. Then I inserted the data into an SQL database, with one table for each row. Then it was just a matter of wiring it all together within a Node server, and creating a basic front-end for accepting parameters and displaying results."
        ],
        skills: ["TypeScript", "Node", "Express", "SQL", "R"],
        tag: "Web Development",
        link: "http://hafcarbon.com/",
        gallery: ['https://dreamstateospublic.s3.us-east-2.amazonaws.com/portfolio/haf/HAF Carbon Prototype.jpg', 'https://dreamstateospublic.s3.us-east-2.amazonaws.com/portfolio/haf/HAF Carbon Prototype Results.jpg']
    },
    {
        name: "Beck Automotive",
        route: "beck",
        description: [
            "Beck is an automotive company from Indiana that manufactures replicas of retro Porsche cars from the 1970s. They not only make true faith recreations of cars from that era, but can also do custom manufactory at every level. Their slogan: \"Home of the Beck Speedster\""
        ],
        logo: "https://dreamstateospublic.s3.us-east-2.amazonaws.com/portfolio/beck/beck.png",
        problem: [
            "This client mostly wanted an updated look to their website and a custom configurator for each of their models. The previous website had an outdated look and consisted of strictly static HTML pages. Due to the high frequency of content changes, this slowly corroded the consistency of the design, and it had no back-end architecture to intake or store any data for a configurator."
        ],
        solution: [
            "This was one of the rare instances where I actually suggested a Wordpress build, since normally whenever I deal with Wordpress, it's fixing previous fragile architecture and then developing as independently as possible from it. But in this case, they needed to change content very frequently. Whether it be a manual, some car specs, a legislation change, an FAQ, or an entirely new page, these were to be done by people who make cars all day, not websites. So, having something that mimicked Word and Excel while being able to edit and publish changes immediately was a big draw for them.",
            "However I still developed everything that required back-end architecture outside of Wordpress to avoid deprecation, which was mainly the car configurator and a contact form. To achieve this hybrid model, I stored the car models, parts, engine options, and color options in a separate database. Due to how customizable these cars are, the configuration options were very interrelated and had complex conditionals, so they wouldn't have been achievable inside Wordpress's framework. I then created basic CRUD operations and used these inside the Wordpress portal for data entry. Using Wordpress's \"Shortcode\", I was able to inject my own PHP into the block editor to render the configuration UI, such that other users can still edit the page's content."
        ],
        skills: ['PHP', 'UI / UX Design', 'TypeScript', 'MySQL', 'SASS'],
        tag: "Web Development",
        link: "https://beckspeedster.dev/",
        gallery: ['https://dreamstateospublic.s3.us-east-2.amazonaws.com/portfolio/beck/Beck Speedster.jpg', 'https://dreamstateospublic.s3.us-east-2.amazonaws.com/portfolio/beck/Beck Speedster Products.jpg', 'https://dreamstateospublic.s3.us-east-2.amazonaws.com/portfolio/beck/Beck Speedster Configurator.jpg', 'https://dreamstateospublic.s3.us-east-2.amazonaws.com/portfolio/beck/Beck Speedster Manuals.jpg', 'https://dreamstateospublic.s3.us-east-2.amazonaws.com/portfolio/beck/Beck Speedster About.jpg', 'https://dreamstateospublic.s3.us-east-2.amazonaws.com/portfolio/beck/Beck Speedster Contact.jpg', 'https://dreamstateospublic.s3.us-east-2.amazonaws.com/portfolio/beck/Beck Speedster FAQs.jpg']
    },
    {
        name: "Little Venice",
        route: "littlevenice",
        description: [
            "An Italian restaurant located in Binghamton, New York. Known for their home-made tomato sauce, they not only have a dine-in restaurant, but sell high quality ingredients on their e-commerce store."
        ],
        logo: "https://dreamstateospublic.s3.us-east-2.amazonaws.com/portfolio/littlevenice/littlevenice.png",
        problem: [
            "This client had scaled their e-commerce operations with a \"drag-and-drop\" and \"plugin\" based Wordpress website that fell into disrepair. These situations are pretty much always the same, they use a lot of plugins aren't maintained, and quickly become deprecated, causing severe dependency issues. The source of this specific problem was some of the dependencies began clashing after an update, namely the front-end plugin \"Avada\", and a few plugins related to \"WooCommerce.\"",
            "Since many of these plugins store saved data in non-standardized structures, once you store all your data inside of them, it's very difficult to migrate. So, this usually ends up being a lot of re-development to avoid these situations moving forward."
        ],
        solution: [
            "The first thing I did was make a staging site, migrated the build and only the necessary SQL databases, and deleted all the \"plugins\" except for WooCommerce to retain their e-commerce data. Then, I created new SQL schemas for their menus and FAQs, created some basic CRUD operations, and developed a back-end portal inside Wordpress to enter this information. Finally, I re-designed and re-developed the entire front-end in PHP, and then added some filtering functionalities to the WooCommerce plugin."
        ],
        skills: ["PHP", "UI / UX Design", "Typescript", "SASS", "MySQL", "Integrations", "WooCommerce"],
        tag: "Web Development",
        link: "https://littlevenicerestaurant.com",
        gallery: ['https://dreamstateospublic.s3.us-east-2.amazonaws.com/portfolio/littlevenice/Little Venice.jpg', 'https://dreamstateospublic.s3.us-east-2.amazonaws.com/portfolio/littlevenice/Little Venice Menu.jpg', 'https://dreamstateospublic.s3.us-east-2.amazonaws.com/portfolio/littlevenice/Little Venice Shop.jpg', 'https://dreamstateospublic.s3.us-east-2.amazonaws.com/portfolio/littlevenice/Little Venice Reservation.jpg', 'https://dreamstateospublic.s3.us-east-2.amazonaws.com/portfolio/littlevenice/Little Venice Item.jpg', 'https://dreamstateospublic.s3.us-east-2.amazonaws.com/portfolio/littlevenice/Little Venice Sauce.jpg', 'https://dreamstateospublic.s3.us-east-2.amazonaws.com/portfolio/littlevenice/Little Venice FAQ.jpg']
    },
    {
        name: "Well Tank Goodness",
        route: "welltankgoodness",
        description: [
            "An aquatic pet store based in Binghamton, New York. Offers all kinds of aquarium supplies, saltwater and freshwater plants and fish, and an aquarium maintenance service."
        ],
        logo: "https://dreamstateospublic.s3.us-east-2.amazonaws.com/portfolio/wtg/wtg.png",
        problem: [
            "This project was quite pleasant in that all that was needed was a simple website to capture inquiries for their aquarium maintenance service. Most of the focus was on the aesthetics, while clearly outlining their services."
        ],
        solution: [
            "First I mocked up a design largely influenced by New York museums at the client's request. Then, instead of outlining their services on one page and having a contact form on another, I instead combined the two so a user can select their desired services while reading them. Then, I used an integration to embed some products they were selling via Shopify. And finally, the rest of the project was just developing a simple front-end, and opening endpoints to capture said inquires."
        ],
        skills: ["PHP", "UI / UX Design", "Typescript", "SASS", "HTML", "Integrations"],
        tag: "Web Development",
        link: "https://welltankgoodness.com/",
        gallery: ['https://dreamstateospublic.s3.us-east-2.amazonaws.com/portfolio/wtg/Well Tank Goodness.jpg', 'https://dreamstateospublic.s3.us-east-2.amazonaws.com/portfolio/wtg/Well Tank Goodness Service.jpg', 'https://dreamstateospublic.s3.us-east-2.amazonaws.com/portfolio/wtg/Well Tank Goodness Shop.jpg', 'https://dreamstateospublic.s3.us-east-2.amazonaws.com/portfolio/wtg/Well Tank Goodness About.jpg']
    }
]

export default portfolioConfig;