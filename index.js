const connectDB = require('./server/db');
require('@colors/colors');
const { promptMenuPrincipal } = require('./menu');


const main = async () => {
    await connectDB();    
    await promptMenuPrincipal();
    process.exit();
};

main();