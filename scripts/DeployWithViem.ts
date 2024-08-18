async function main() {
    const proposals = process.argv.slice(2);
    if (!proposals || proposals.length < 1)
      throw new Error("Proposals not provided");
    console.log("Proposals:");
    proposals.forEach((element, index) => {
      console.log(`Proposal N. ${index + 1}: ${element}`);
    });
  }