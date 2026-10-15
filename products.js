const products = [
    {
        id: "little-ghosts",
        name: "Little Ghosts",
        price: "$2.00–$7.00",
        category: "Gifts",
        image: "assets/ghosts/group.png",
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

// Replace these image paths with finished-print photos when ready.
// Keep IDs stable so saved customer selections continue to work.
const ghostCollection = {
    email: "info.mb3dcreations@gmail.com",
    groupImage: "assets/ghosts/group.png",
    imageNote: "Digital model previews.",
    designs: [
        { id: "boo-bell", name: "Boo Bell", image: "assets/ghosts/boo-bell.png" },
        { id: "shy-spook", name: "Shy Spook", image: "assets/ghosts/shy-spook.png" },
        { id: "little-gasp", name: "Little Gasp", image: "assets/ghosts/little-gasp.png" },
        { id: "bow-peep", name: "Bow Peep", image: "assets/ghosts/bow-peep.png" },
        { id: "shy-ribbon", name: "Shy Ribbon", image: "assets/ghosts/shy-ribbon.png" },
        { id: "dapper-boo", name: "Dapper Boo", image: "assets/ghosts/dapper-boo.png" },
        { id: "headphone-haunt", name: "Headphone Haunt", image: "assets/ghosts/headphone-haunt.png" },
        { id: "beanie-boo", name: "Beanie Boo", image: "assets/ghosts/beanie-boo.png" },
        { id: "brainy-boo", name: "Brainy Boo", image: "assets/ghosts/brainy-boo.png" }
    ],
    // Prices in cents. Packs contain three ghosts, all the selected size.
    sizes: [
        { id: "small", name: "Small", single: 200, trio: 500 },
        { id: "medium", name: "Medium", single: 250, trio: 600 },
        { id: "large", name: "Large", single: 300, trio: 700 }
    ],
    colors: [
        { id: "white", name: "White", swatch: "#ffffff" },
        { id: "blue-glow", name: "Blue glow", swatch: "#b3dff8" },
        { id: "green-glow", name: "Green glow", swatch: "#c0e9ad" },
        { id: "pink-glow", name: "Pink glow", swatch: "#f6c6df" },
        { id: "yellow-glow", name: "Yellow glow", swatch: "#faedaa" }
    ]
};

