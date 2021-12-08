const buildings = [
  {
    _id: "Building1",
    idOwner: "1000",
  },
];

const lodgings = [
  {
    _id: "88a33c23-3332-4ef2-bd71-be7a643048aa",
    isAvailable: true,
    type: "5 1/2",
    idAddress: "88a33c23-3332-4ef2-bd71-be7a6430485a",
    idBuilding: "Building1",
  },
  {
    _id: "88a33c23-3332-4ef2-bd71-be7a643048bb",
    isAvailable: true,
    type: "3 1/2",
    idAddress: "88a33c23-3332-4ef2-bd71-be7a6430485b",
    idBuilding: "Building1",
  },
];

const address = [
  {
    _id: "88a33c23-3332-4ef2-bd71-be7a6430485a",
    civicNumber: "8485",
    streetName: "Chardonnet avenue",
    appartmentNumber: "",
    town: "Montreal (Anjou)",
    postalCode: "H1K 1B8",
  },
  {
    _id: "88a33c23-3332-4ef2-bd71-be7a6430485b",
    civicNumber: "8487",
    streetName: "Chardonnet avenue",
    appartmentNumber: "",
    town: "Montreal (Anjou)",
    postalCode: "H1K 1B8",
  },
];

const pictures = [
  {
    _id: "88a33c23-3332-4ef2-bd71-be7a6430485z",
    imageUrl:
      "https://res.cloudinary.com/dsustp0mg/image/upload/v1638808919/Building1/res-console.cloudinary_dnz6sk.jpg",
    idLodging: "88a33c23-3332-4ef2-bd71-be7a643048aa",
  },
  {
    _id: "88a33c23-3332-4ef2-bd71-be7a6430485y",
    imageUrl:
      "https://res.cloudinary.com/dsustp0mg/image/upload/v1638809273/Building1/Building1_2/pic_37_fcoqep.jpg",
    idLodging: "88a33c23-3332-4ef2-bd71-be7a643048bb",
  },
];

const users = [
  {
    _id: "1000",
    firstName: "Nathalie",
    lastName: "Lauture",
    role: "Admin",
    telephone: "514-555-8877",
    email: "nath@hotmail.com",
    idLodging: "",
    idOwner: "",
  },
];

module.exports = { buildings, lodgings,address, pictures,users };
