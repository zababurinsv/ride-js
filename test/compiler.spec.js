const compiler = require('../src');
const {expect} = require('chai');

describe('Compiler', () => {
    it('Should compile contract', () => {
        const contract = `
            # alice { private:EUzwt3buFVEyWAQQpt8ZXxDiEG51W7DhW6Hft54UHFfk,public:5AzfA9UfpWVYiwFwvdr77k6LWupSTGLb14b24oVdEpMM }
            # bob { private:7V13MftX7mbcZpEkzyUgsj5S7CwgvCyqqFc2ire7X7WC,public:2KwU4vzdgPmKyf7q354H9kSyX9NZjNiq4qbnH2wi2VDF }
            # cooper { private:F2rWD6xPVjm2B8BwJfrS41wgjUPHghYPbafVWsKFojPF,public:GbrUeGaBfmyFJjSQb9Z8uTCej5GzjXfRDVGJGrmgt5cD }
            #define public keys
            let alicePubKey  = base58'5AzfA9UfpWVYiwFwvdr77k6LWupSTGLb14b24oVdEpMM'
            let bobPubKey    = base58'2KwU4vzdgPmKyf7q354H9kSyX9NZjNiq4qbnH2wi2VDF'
            let cooperPubKey = base58'GbrUeGaBfmyFJjSQb9Z8uTCej5GzjXfRDVGJGrmgt5cD'
            
            #check whoever provided the valid proof
            let aliceSigned  = if(sigVerify(tx.bodyBytes, tx.proofs[0], alicePubKey  )) then 1 else 0
            let bobSigned    = if(sigVerify(tx.bodyBytes, tx.proofs[1], bobPubKey    )) then 1 else 0
            let cooperSigned = if(sigVerify(tx.bodyBytes, tx.proofs[2], cooperPubKey )) then 1 else 0
            
            #sum up every valid proof to get at least 2
            aliceSigned + bobSigned + cooperSigned >= 2
            `;
        const result = compiler.compile(contract);
        expect(result.error).to.be.undefined
    });

    it('Should not compile invalid contract', () => {
        const contract = `
            let a = {
                let x = 1
                1
            }
            x`;
        const result = compiler.compile(contract);
        expect(result.error).to.eql('Compilation failed: A definition of \'x\' is not found in 93-94')
    })

    it('Should give sensible error on nulls and undefined', () => {
        const contract1 = null;
        const contract2 = undefined;
        const result1 = compiler.compile(contract1);
        const result2 = compiler.compile(contract2);
        expect(result1.error).to.eql('Type error: contract should be string')
        expect(result2.error).to.eql('Type error: contract should be string')
    })
});

