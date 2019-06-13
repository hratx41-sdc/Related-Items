var faker = require('faker');
const createCsvStringifier = require('csv-writer').createObjectCsvStringifier;
const fs = require('fs');

faker.seed(123);

//write a function to create header 
const csvStringifier = createCsvStringifier({
    append: true,
    path: '/fake.csv',
    header: [
      { id: 'uuid', title: 'UUID' },
      { id: 'name', title: 'name' },
      { id: 'price', title: 'price' },
      {id: 'category', tite: 'category'},
      { id: 'images', title: 'images' }
    ],
  });

//write a function to writeFile
fs.writeFileSync('fake.csv', csvStringifier.getHeaderString(), (err) => {
  if(err) throw err;
  console.log('file header added');
});

//Returns random index of an array
const randomElement = (collection) => {
  var randomIndex = Math.floor(Math.random() * collection.length);
  return randomIndex;
};

const possibleCategories = [faker.lorem.word(), faker.lorem.word(), faker.lorem.word(), faker.lorem.word(), faker.lorem.word()];
const imageUrls = ['https://crew-spence-sdc.s3.us-east-2.amazonaws.com/04-03-18_STUDIO2_FY517_Black_760x.jpeg', 'https:/crew-spence-sdc.s3.us-east-2.amazonaws.com/04-22-19_Studio_4_RM_18-07-55_31__FNP0253_LightWash_9257_JD_760x.jpg', 'https:/crew-spence-sdc.s3.us-east-2.amazonaws.com/04-22-19_Studio_4_RM_18-46-44_42__KA06_Black_Gold_9610_JD_760x.jpg', 'https:/crew-spence-sdc.s3.us-east-2.amazonaws.com/04-22-19_Studio_4_RM_20-11-10_57__M0078T_Red_10069_JD_760x.jpg', 'https://crew-spence-sdc.s3.us-east-2.amazonaws.com04-22-19_Studio_4_RM_20-15-05_59__M0078T_Navy_10109_JD_760x.jpg', 'https://crew-spence-sdc.s3.us-east-2.amazonaws.com04-26-18_Studio2_EP7587_Red_2542_AJ_760x.jpg', 'https://crew-spence-sdc.s3.us-east-2.amazonaws.com04-29-19_Studio_2_RM_16-54-57_30__EMT2088T_Blue_Combo_19124_RG_760x.jpg', 'https://crew-spence-sdc.s3.us-east-2.amazonaws.com10-24-18_Studio_3_15-43-15_1TACR1004_Navy_1182_AJ_760x.jpg', 'https://crew-spence-sdc.s3.us-east-2.amazonaws.com/10-29-18_Studio_30586_KND4175_BLACK_JD_760x.jpg', 'https://crew-spence-sdc.s3.us-east-2.amazonaws.com/Fashion_Nova_10-21-16-095_760x.jpg'];

//write a function to create the contents of the db and append the contents to the file
for (let i = 1; i < 10000001; i++) {
  let productName = faker.commerce.productName();
  let price = '$' + faker.commerce.price();
  let randomCategory = possibleCategories[randomElement(possibleCategories)]
  let randomImage = imageUrls[randomElement(imageUrls)];
  let record = [{
    uuid: i,
    name: productName,
    price: price,
    category: randomCategory,
    images: randomImage,
  }]

  fs.appendFileSync('fake.csv', csvStringifier.stringifyRecords(record), (err) => {
    if (err) throw err;
    console.log(i);
  });
}