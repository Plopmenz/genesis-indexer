export const OpenmeshGenesisContract = {
  address: "0x0000000000000000000000000000000000000000",
  abi: [
    {
      type: "constructor",
      inputs: [
        {
          name: "_tokensPerWeiPerPeriod",
          type: "uint256[]",
          internalType: "uint256[]",
        },
        {
          name: "_token",
          type: "address",
          internalType: "contract IERC20MintBurnable",
        },
        {
          name: "_nft",
          type: "address",
          internalType: "contract IERC721Mintable",
        },
        {
          name: "_treasury",
          type: "address",
          internalType: "address payable",
        },
        { name: "_start", type: "uint32", internalType: "uint32" },
        {
          name: "_periodEnds",
          type: "uint32[]",
          internalType: "uint32[]",
        },
        {
          name: "_minWeiPerAccount",
          type: "uint256",
          internalType: "uint256",
        },
        {
          name: "_maxWeiPerAccount",
          type: "uint256",
          internalType: "uint256",
        },
      ],
      stateMutability: "nonpayable",
    },
    { type: "fallback", stateMutability: "payable" },
    { type: "receive", stateMutability: "payable" },
    {
      type: "function",
      name: "collectContributions",
      inputs: [],
      outputs: [],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "contributed",
      inputs: [{ name: "", type: "address", internalType: "address" }],
      outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "maxWeiPerAccount",
      inputs: [],
      outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "minWeiPerAccount",
      inputs: [],
      outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "nft",
      inputs: [],
      outputs: [
        {
          name: "",
          type: "address",
          internalType: "contract IERC721Mintable",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "owner",
      inputs: [],
      outputs: [{ name: "", type: "address", internalType: "address" }],
      stateMutability: "pure",
    },
    {
      type: "function",
      name: "periodEnds",
      inputs: [{ name: "", type: "uint256", internalType: "uint256" }],
      outputs: [{ name: "", type: "uint32", internalType: "uint32" }],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "start",
      inputs: [],
      outputs: [{ name: "", type: "uint32", internalType: "uint32" }],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "token",
      inputs: [],
      outputs: [
        {
          name: "",
          type: "address",
          internalType: "contract IERC20MintBurnable",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "tokensPerWei",
      inputs: [],
      outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "tokensPerWeiPerPeriod",
      inputs: [{ name: "", type: "uint256", internalType: "uint256" }],
      outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "treasury",
      inputs: [],
      outputs: [{ name: "", type: "address", internalType: "address payable" }],
      stateMutability: "view",
    },
    {
      type: "event",
      name: "ContributionMade",
      inputs: [
        {
          name: "from",
          type: "address",
          indexed: false,
          internalType: "address",
        },
        {
          name: "amount",
          type: "uint256",
          indexed: false,
          internalType: "uint256",
        },
        {
          name: "givenTokens",
          type: "uint256",
          indexed: false,
          internalType: "uint256",
        },
        {
          name: "givenNFT",
          type: "bool",
          indexed: false,
          internalType: "bool",
        },
      ],
      anonymous: false,
    },
    { type: "error", name: "FundraiserNotOverYet", inputs: [] },
    { type: "error", name: "LessThanMinPerAccount", inputs: [] },
    { type: "error", name: "NoFundsAttached", inputs: [] },
    { type: "error", name: "NotDuringFundraisingPeriod", inputs: [] },
    { type: "error", name: "SurpassMaxPerAccount", inputs: [] },
    { type: "error", name: "TreasuryReverted", inputs: [] },
  ],
} as const;
