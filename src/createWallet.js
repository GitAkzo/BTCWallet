//Importação das dependências
const bip32 = require('bip32')
const bip39 = require('bip39')
const bitcoin = require('bitcoinjs-lib')

// Definição da rede
// bitcoin: rede principal - mainnet
// testnet: rede de teste - testnet
const network = bitcoin.networks.testnet

// Derivação de carteiras HD
const path = `m/49'/1'/0'/0` 

// Criação do mnemonic para a seed (palavras de senha)
let mnemonic = bip39.generateMnemonic()
const seed = bip39.mnemonicToSeedSync(mnemonic)

// Criação da raiz da carteira HD (Hierarchical Deterministic)
let root = bip32.fromSeed(seed, network)

// Criação de uma conta - par pvt-pub keys
let account = root.derivePath(path)
let node = account.derive(0).derive(0)

// Criação do endereço p2phk
let btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network,
}).address

// Escrevendo dados gerados
console.log("Carteira gerada")
console.log("Endereço: ", btcAddress)
console.log("Chave privada:", node.toWIF())
console.log("Seed:", mnemonic)