declare global {
    type PortfolioConfig = {
        name: string
        route: string,
        description: string,
        problem: string,
        solution: string,
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
        description: "Blah Blah Blah",
        logo: "https://nylandquest.com/wp-content/uploads/sites/12/2023/01/nylq_logo.png",
        problem: "",
        solution: "",
        skills: ['WordPress', 'PHP'],
        tag: "Web Development",
        link: "https://nylandquest.com",
        gallery: ["/assets/New_York_Land_Quest.jpg"]
    },
    {
        name: "Red Barn HPC",
        route: "redbarnhpc",
        description: "",
        logo: "https://placehold.co/600x400",
        problem: "",
        solution: "",
        skills: [],
        tag: "",
        link: "",
        gallery: []
    },
    {
        name: "Long Island Exclusive",
        route: "longislandexclusive",
        description: "",
        logo: "https://placehold.co/600x400",
        problem: "",
        solution: "",
        skills: [],
        tag: "",
        link: "",
        gallery: []
    },
    {
        name: "Beck Automotive",
        route: "beck",
        description: "",
        logo: "https://placehold.co/600x400",
        problem: "",
        solution: "",
        skills: [],
        tag: "",
        link: "",
        gallery: []
    },
    {
        name: "Little Venice",
        route: "littlevenice",
        description: "",
        logo: "https://placehold.co/600x400",
        problem: "",
        solution: "",
        skills: [],
        tag: "",
        link: "",
        gallery: []
    }
]

export default portfolioConfig;