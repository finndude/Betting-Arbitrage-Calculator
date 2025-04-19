function calculate() {
    const oddsA = parseFloat(document.getElementById("oddsA").value);
    const oddsB = parseFloat(document.getElementById("oddsB").value);
    const stake = parseFloat(document.getElementById("stake").value);
    const isThreeWay = document.getElementById("threeWayToggle").checked;
    const resultsDiv = document.getElementById("results");
  
    let oddsC, invA, invB, invC, arbPercent;
  
    if (!oddsA || !oddsB || !stake || oddsA <= 0 || oddsB <= 0 || stake <= 0) {
      resultsDiv.innerHTML = "Please enter valid positive values for all fields.";
      return;
    }
  
    // For 2-way market
    if (!isThreeWay) {
      invA = 1 / oddsA;
      invB = 1 / oddsB;
      arbPercent = invA + invB;
  
      if (arbPercent < 1) {
        const stakeA = (stake * invA) / arbPercent;
        const stakeB = (stake * invB) / arbPercent;
        const payout = Math.min(stakeA * oddsA, stakeB * oddsB);
        const profit = payout - stake;
  
        resultsDiv.innerHTML = `
          <p style="color: green;"><strong>Arbitrage opportunity found!</strong></p>
          <p>Stake on Outcome A: $${stakeA.toFixed(2)}</p>
          <p>Stake on Outcome B: $${stakeB.toFixed(2)}</p>
          <p>Total Stake: $${stake.toFixed(2)}</p>
          <p>Guaranteed Payout: $${payout.toFixed(2)}</p>
          <p><strong>Guaranteed Profit: $${profit.toFixed(2)}</strong></p>
        `;
      } else {
        resultsDiv.innerHTML = `
          <p style="color: red;"><strong>No arbitrage opportunity.</strong></p>
          <p>Arbitrage %: ${(arbPercent * 100).toFixed(2)}%</p>
        `;
      }
    }
    // For 3-way market
    else {
      oddsC = parseFloat(document.getElementById("oddsC").value);
  
      if (!oddsC || oddsC <= 0) {
        resultsDiv.innerHTML = "Please enter valid odds for Outcome C.";
        return;
      }
  
      invA = 1 / oddsA;
      invB = 1 / oddsB;
      invC = 1 / oddsC;
      arbPercent = invA + invB + invC;
  
      if (arbPercent < 1) {
        const stakeA = (stake * invA) / arbPercent;
        const stakeB = (stake * invB) / arbPercent;
        const stakeC = (stake * invC) / arbPercent;
        const payout = Math.min(stakeA * oddsA, stakeB * oddsB, stakeC * oddsC);
        const profit = payout - stake;
  
        resultsDiv.innerHTML = `
          <p style="color: green;"><strong>Arbitrage opportunity found!</strong></p>
          <p>Stake on Outcome A: $${stakeA.toFixed(2)}</p>
          <p>Stake on Outcome B: $${stakeB.toFixed(2)}</p>
          <p>Stake on Outcome C: $${stakeC.toFixed(2)}</p>
          <p>Total Stake: $${stake.toFixed(2)}</p>
          <p>Guaranteed Payout: $${payout.toFixed(2)}</p>
          <p><strong>Guaranteed Profit: $${profit.toFixed(2)}</strong></p>
        `;
      } else {
        resultsDiv.innerHTML = `
          <p style="color: red;"><strong>No arbitrage opportunity.</strong></p>
          <p>Arbitrage %: ${(arbPercent * 100).toFixed(2)}%</p>
        `;
      }
    }
  }
  
  // Toggle the visibility of the third outcome input
  document.getElementById("threeWayToggle").addEventListener('change', function() {
    const oddsCGroup = document.getElementById("oddsCGroup");
    if (this.checked) {
      oddsCGroup.style.display = "block";
    } else {
      oddsCGroup.style.display = "none";
    }
  });
  