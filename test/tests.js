const {expect} = require('chai');
const { ethers } = require("hardhat");


//ethers js is a javascript library and waffle is a smart contract testing library built on top of it.
describe('testing vending machine', function() {
    let Owner , add1 ,add2, add3;
    let contract1;
    let contract;

    beforeEach (async function() {
        [Owner,add1,add2,add3] = await ethers.getSigners();
        contract1 = await ethers.getContractFactory('VendingMachine');
        contract = await contract1.deploy();
    });

    describe('', function() {
        it('test1: constructor working fine', async function() {
            const addr = await contract.owner();
            expect(addr).to.equal(Owner.address);
        })

        it('test2: BuyDonuts function working fine', async function (){
            const ans =  await contract.connect(add2).BuyDonuts(2, {value: ethers.utils.parseEther('1')});
            const donuts = await contract.connect(add2.address).MyDonuts();
            // console.log(ans);
            expect(donuts).to.equal(2);
        })

        it('test3: Eat donuts', async function(){
            const ans =  await contract.connect(add2).BuyDonuts(2, {value: ethers.utils.parseEther('1')});
            const ans2 = await contract.connect(add2).Eat(1);
            const donuts = await contract.connect(add2.address).MyDonuts();

            expect(donuts).to.equal(1);
        })
       
        it('test4: refill ', async function() {
            const add = contract.address;
            const bal1 = await contract.connect(add).MyDonuts();
            bal1.toString();
            await contract.connect(Owner).Refill();
            const bal2 = await contract.connect(add).MyDonuts();
            bal2.toString();
            if(bal1==(bal2-25)) {
                console.log('oh yeah');
            }
            
        })

        it ('test5: withdraw ', async function() {
            await contract.connect(add1).BuyDonuts(2, { value: ethers.utils.parseEther('1')});
            await contract.connect(add2).BuyDonuts(3, {value: ethers.utils.parseEther('2')});
            await contract.connect(add3).BuyDonuts(4, { value: ethers.utils.parseEther('5')});
            const bal1 = await ethers.provider.getBalance(contract.address);
            await contract.connect(Owner).withdraw();

            const bal2 = await ethers.provider.getBalance(Owner.address);
            console.log('done')
            if(bal1!=bal2) {
                console.log('alright alright alright');
            }
            
        })
    })
})