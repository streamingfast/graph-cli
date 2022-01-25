const MINIMUM_ACCOUNT_ID_LENGTH = 2
const MAXIMUM_ACCOUNT_ID_LENGTH = 64

const RULES_URL = 'tbd'

module.exports = class SolanaContract {
  static identifierName() {
    return 'programId'
  }

  constructor(programId) {
    this.programId = programId
  }

  _validateLength() {
    return this.programId.length >= MINIMUM_ACCOUNT_ID_LENGTH &&
      this.programId.length <= MAXIMUM_ACCOUNT_ID_LENGTH
  }

  _validateFormat() {
    const pattern = /^.*$/
    //todo: ^^^^^^^

    return pattern.test(this.programId)
  }

  validate() {
    if (!this._validateLength(this.programId)) {
      return {
        valid: false,
        error: `programId must be between '${MINIMUM_ACCOUNT_ID_LENGTH}' and '${MAXIMUM_ACCOUNT_ID_LENGTH}' characters, see ${RULES_URL}`,
      }
    }
    //todo: fix this ^^^^^

    if (!this._validateFormat()) {
      return {
        valid: false,
        error: `Account must conform to the rules on ${RULES_URL}`,
      }
    }

    return {
      valid: true,
      error: null,
    }
  }
}
