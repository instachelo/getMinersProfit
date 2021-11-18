import {
    createTransactionEvent,
    HandleBlock,
    HandleTransaction
  } from "forta-agent"
  import agent from "./agent"
  
  describe("pool created agent", () => {
    let handleTransaction: HandleTransaction
  
    const createTxEventWithGas = () => createTransactionEvent({
      transaction:{
        hash:"",
        to:"",
        from:"123",
        nonce:1,
        gas:"0x1A664",
        gasPrice:"0x6FC23AC00",
        value:"",
        data:"",
        r:"",
        s:"",
        v:""

        
      },
      type:undefined,
      network:undefined,
      receipt: {
        status:true,
        root:"",
        gasUsed:"0x1A664",
        cumulativeGasUsed:"",
        logsBloom:"",
        logs:{} as any,
        contractAddress:"",
        blockHash:"",
        blockNumber:1,
        transactionHash:"",
        transactionIndex:1

      },
      block:{
        number:12471043,
        hash:"",
        timestamp:123
      }


    })
  
    beforeAll(() => {
      handleTransaction = agent.handleTransaction
    })
  
    describe("token event", () => {
      it("findings length == 1", async () => {
        const txEvent = createTxEventWithGas()
  
        const findings = await handleTransaction(txEvent)
  
        expect(findings.length).toBe(1)
      })
  
    })
  })