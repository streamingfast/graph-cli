const immutable = require('immutable')
const EthereumTypeGenerator = require('./ethereum/type-generator')
const EthereumTemplateCodeGen = require('./ethereum/codegen/template')
const EthereumABI = require('./ethereum/abi')
const EthereumSubgraph = require('./ethereum/subgraph')
const NearSubgraph = require('./near/subgraph')
const SolanaSubgraph = require('./solana/subgraph')
const EthereumContract = require('./ethereum/contract')
const NearContract = require('./near/contract')
const SolanaContract = require('./solana/contract')
const EthereumManifestScaffold = require('./ethereum/scaffold/manifest')
const NearManifestScaffold = require('./near/scaffold/manifest')
const SolanaManifestScaffold = require('./solana/scaffold/manifest')
const EthereumMappingScaffold = require('./ethereum/scaffold/mapping')
const NearMappingScaffold = require('./near/scaffold/mapping')
const SolanaMappingScaffold = require('./solana/scaffold/mapping')

module.exports = class Protocol {
  static fromDataSources(dataSourcesAndTemplates) {
    const firstDataSourceKind = dataSourcesAndTemplates[0].kind
    return new Protocol(firstDataSourceKind)
  }

  constructor(name) {
    this.name = this.normalizeName(name)
  }

  static availableProtocols() {
    return immutable.fromJS({
      // `ethereum/contract` is kept for backwards compatibility.
      // New networks (or protocol perhaps) shouldn't have the `/contract` anymore (unless a new case makes use of it).
      ethereum: ['ethereum', 'ethereum/contract'],
      near: ['near'],
      solana: ['solana'],
    })
  }

  static availableNetworks() {
    return immutable.fromJS({
      ethereum: [
        'mainnet',
        'kovan',
        'rinkeby',
        'ropsten',
        'goerli',
        'poa-core',
        'poa-sokol',
        'xdai',
        'matic',
        'mumbai',
        'fantom',
        'bsc',
        'chapel',
        'clover',
        'avalanche',
        'fuji',
        'celo',
        'celo-alfajores',
        'fuse',
        'mbase',
        'arbitrum-one',
        'arbitrum-rinkeby',
        'optimism',
        'optimism-kovan',
        'aurora',
        'aurora-testnet',
      ],
      near: [
        'near-mainnet',
        'near-testnet'
      ],
      solana: [
        'solana-mainnet',
      ],
    })
  }

  normalizeName(name) {
    return Protocol.availableProtocols().findKey(possibleNames =>
      possibleNames.includes(name),
    )
  }

  displayName() {
    switch (this.name) {
      case 'ethereum':
        return 'Ethereum'
      case 'near':
        return 'NEAR'
      case 'solana':
        return 'SOLANA'
    }
  }

  // Receives a data source kind, and checks if it's valid
  // for the given protocol instance (this).
  isValidKindName(kind) {
    return Protocol.availableProtocols()
      .get(this.name, immutable.List())
      .includes(kind)
  }

  hasABIs() {
    switch (this.name) {
      case 'ethereum':
        return true
      case 'near':
        return false
      case 'solana':
        return false
    }
  }

  hasEvents() {
    switch (this.name) {
      case 'ethereum':
        return true
      case 'near':
        return false
      case 'solana':
        return false
    }
  }

  getTypeGenerator(options) {
    switch (this.name) {
      case 'ethereum':
        return new EthereumTypeGenerator(options)
      case 'near':
        return null
      case 'solana':
        return null
    }
  }

  getTemplateCodeGen(template) {
    switch (this.name) {
      case 'ethereum':
        return new EthereumTemplateCodeGen(template)
      default:
        throw new Error(
          `Template data sources with kind '${this.name}' are not supported yet`,
        )
    }
  }

  getABI() {
    switch (this.name) {
      case 'ethereum':
        return EthereumABI
      case 'near':
        return null
      case 'solana':
        return null
    }
  }

  getSubgraph(options = {}) {
    const optionsWithProtocol = { ...options, protocol: this }

    switch (this.name) {
      case 'ethereum':
        return new EthereumSubgraph(optionsWithProtocol)
      case 'near':
        return new NearSubgraph(optionsWithProtocol)
      case 'solana':
        return new SolanaSubgraph(optionsWithProtocol)
      default:
        throw new Error(`Data sources with kind '${this.name}' are not supported yet`)
    }
  }

  getContract() {
    switch (this.name) {
      case 'ethereum':
        return EthereumContract
      case 'near':
        return NearContract
      case 'solana':
        return SolanaContract
    }
  }

  getManifestScaffold() {
    switch (this.name) {
      case 'ethereum':
        return EthereumManifestScaffold
      case 'near':
        return NearManifestScaffold
      case 'solana':
        return SolanaManifestScaffold
    }
  }

  getMappingScaffold() {
    switch (this.name) {
      case 'ethereum':
        return EthereumMappingScaffold
      case 'near':
        return NearMappingScaffold
      case 'solana':
        return SolanaMappingScaffold
    }
  }
}