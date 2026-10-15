const products = [
    {
        id: "little-ghosts",
        name: "Little Ghosts",
        price: "$2.00–$7.00",
        category: "Gifts",
        image: "assets/ghosts/collection.jpg",
        description: "Pick a little personality for your shelf, desk, or spooky collection. Choose one ghost or build a matching-size trio.",
        available: true,
        configurable: "ghosts"
    },
    {
        name: "Strawberry Boop Cow",
        price: "$8.00",
        category: "Articulated Creatures",
        image: "",
        description: "A cute 3D printed strawberry-themed cow. Printed to order and available in fun colors.",
        colors: "Pink, white, green, or custom colors",
        squareLink: "#",
        paypalLink: "#",
        available: true
    },
    {
        name: "Articulated Dragon",
        price: "$20.00+",
        category: "Articulated Creatures",
        image: "",
        description: "A flexible dragon that moves and bends. Price depends on size, colors, and filament.",
        colors: "Rainbow, silk, solid, or custom colors",
        squareLink: "#",
        paypalLink: "#",
        available: false
    },
    {
        name: "Custom Keychain",
        price: "$5.00+",
        category: "Keychains",
        image: "",
        description: "Custom 3D printed keychains for bags, keys, gifts, teams, or small business promos.",
        colors: "Many colors available",
        squareLink: "#",
        paypalLink: "#",
        available: false
    },
    {
        name: "Home Organizer",
        price: "$10.00+",
        category: "Home Organization",
        image: "",
        description: "Useful 3D printed organizers for desks, drawers, remotes, craft supplies, and more.",
        colors: "Custom colors available",
        squareLink: "#",
        paypalLink: "#",
        available: false
    },
    {
        name: "Fidget Toy",
        price: "$5.00+",
        category: "Gifts",
        image: "",
        description: "Fun 3D printed fidgets that make great small gifts or party favors.",
        colors: "Rainbow, solid, silk, or custom colors",
        squareLink: "#",
        paypalLink: "#",
        available: false
    },
    {
        name: "Seasonal Creation",
        price: "$8.00+",
        category: "Gifts",
        image: "",
        description: "Holiday and seasonal 3D printed creations. Designs will change throughout the year.",
        colors: "Seasonal colors and custom colors",
        squareLink: "#",
        paypalLink: "#",
        available: false
    }
];

// Finished-print photographs supplied by MB3D Creations.
// Keep IDs stable so saved customer selections continue to work.
const ghostCollection = {
    email: "info.mb3dcreations@gmail.com",
    groupImage: "assets/ghosts/collection.jpg",
    imageNote: "Photos show finished prints. Pink and white examples are Large (100%), green Medium (75%), and blue Small (50%). Choose any available color for your ghost. Sizes vary by design.",
    sizeImage: "assets/ghosts/sizes.jpg",
    glowImage: "assets/ghosts/glow.jpg",
    designs: [
        { id: "boo-bell", name: "Classic Smile", image: "assets/ghosts/classic-smile.jpg" },
        { id: "shy-spook", name: "Leaning Smile", image: "assets/ghosts/leaning-smile.jpg" },
        { id: "little-gasp", name: "Surprised", image: "assets/ghosts/surprised.jpg" },
        { id: "bow-peep", name: "Top Bow", image: "assets/ghosts/top-bow.jpg" },
        { id: "shy-ribbon", name: "Side Bow", image: "assets/ghosts/side-bow.jpg" },
        { id: "dapper-boo", name: "Bow Tie", image: "assets/ghosts/bow-tie.jpg" },
        { id: "headphone-haunt", name: "Headphones", image: "assets/ghosts/headphones.jpg" },
        { id: "beanie-boo", name: "Beanie", image: "assets/ghosts/beanie.jpg" },
        { id: "brainy-boo", name: "Glasses", image: "assets/ghosts/glasses.jpg" }
    ],
    // Prices in cents. Packs contain three ghosts, all the selected size.
    sizes: [
        { id: "small", name: "Small (50%)", single: 200, trio: 500 },
        { id: "medium", name: "Medium (75%)", single: 250, trio: 600 },
        { id: "large", name: "Large (100%)", single: 300, trio: 700 }
    ],
    colors: [
        { id: "white", name: "White", swatch: "#ffffff" },
        { id: "blue-glow", name: "Glow Blue", swatch: "#b3dff8" },
        { id: "green-glow", name: "Glow Green", swatch: "#c0e9ad" },
        { id: "pink-glow", name: "Glow Pink", swatch: "#f6c6df" },
        { id: "yellow-glow", name: "Glow Yellow", swatch: "#faedaa" }
    ]
};

