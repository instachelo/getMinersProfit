import { 
  TransactionEvent, 
  Finding, 
  HandleTransaction, 
  FindingSeverity, 
  FindingType,
  createTransactionEvent,
  getJsonRpcUrl

} from 'forta-agent'
import Web3 from "web3"


const web3 = new Web3(getJsonRpcUrl())

const handleTransaction: HandleTransaction = async (txEvent: TransactionEvent) => {
  const findings: Finding[] = [];
     const block = await web3.eth.getBlock(txEvent.block.number)
     const miner = block.miner
     const current_block = txEvent.block.number
     let gasPrice = parseInt(txEvent.transaction.gasPrice, 16)/ 100000000
     gasPrice = gasPrice/10000000000
     const gasUsed = parseInt(txEvent.transaction.gas,16)
     const profit_sum = gasUsed*gasPrice

      findings.push(
        Finding.fromObject({
          name: "BLOCK_PROFIT",
          description: `Block profit calculated `,
          alertId: "FORTA-140",
          severity: FindingSeverity.Info,
          type: FindingType.Info,
          metadata:{
            profit_sum: `${profit_sum}`,
            miner: miner,
            block: `${current_block}`
          }
  
        })
       )
     
  return findings;
}

export default {
  handleTransaction
}