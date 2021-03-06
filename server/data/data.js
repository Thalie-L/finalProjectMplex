const buildings = [
  {
    _id: "Building1",
    desc: "Building in Anjou area",
    status: "active",
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
    address: "8485 Chardonnet avenue",
    city: "Montreal (Anjou)",
    province: "QC",
    postcode: "H1K 1B8",
  },
  {
    _id: "88a33c23-3332-4ef2-bd71-be7a6430485b",
    address: "8487 Chardonnet avenue",
    city: "Montreal (Anjou)",
    province: "QC",
    postcode: "H1K 1B8",
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
    email: "nathalielauture1@gmail.com",
    idLodging: "",
    idOwner: "",
  },
  {
    _id: "1000",
    firstName: "Caroline",
    lastName: "Smith",
    role: "User",
    telephone: "514-555-1234",
    email: "nathaliedev30@gmail.com",
    idLodging: "",
    idOwner: "",
  },
];

module.exports = { buildings, lodgings, address, pictures, users };
