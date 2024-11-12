document.getElementById("calculateBtn").addEventListener("click", function() {
    // Get user inputs
    const billAmount = parseFloat(document.getElementById("billAmount").value);
    const tipPercentage = parseInt(document.getElementById("tipPercentage").value);
    const customTip = parseFloat(document.getElementById("customTip").value);
    const numPeople = parseInt(document.getElementById("numPeople").value);
    
    // Validate the input
    if (isNaN(billAmount) || billAmount <= 0) {
      alert("Please enter a valid bill amount.");
      return;
    }
  
    if (numPeople < 1) {
      alert("Number of people must be at least 1.");
      return;
    }
  
    // Use custom tip if provided, otherwise use the selected percentage
    const tipAmount = customTip > 0 ? customTip : (billAmount * tipPercentage) / 100;
    const totalAmount = billAmount + tipAmount;
    const perPerson = totalAmount / numPeople;
  
    // Format the amounts with currency
    const formattedTip = formatCurrency(tipAmount);
    const formattedTotal = formatCurrency(totalAmount);
    const formattedPerPerson = formatCurrency(perPerson);
  
    // Display results
    document.getElementById("tipAmount").textContent = formattedTip;
    document.getElementById("totalAmount").textContent = formattedTotal;
    document.getElementById("perPerson").textContent = formattedPerPerson;
  });
  
  // Format currency
  function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
  }
  
  // Toggle Currency Format
  document.getElementById("toggleCurrencyBtn").addEventListener("click", function() {
    const currentText = document.getElementById("tipAmount").textContent;
    
    if (currentText.includes('₹')) {
      // If the result is formatted with currency, switch to plain numbers
      updateResultsWithoutCurrency();
    } else {
      // If it's in plain numbers, reformat with currency
      const billAmount = parseFloat(document.getElementById("billAmount").value);
      const tipPercentage = parseInt(document.getElementById("tipPercentage").value);
      const customTip = parseFloat(document.getElementById("customTip").value);
      const numPeople = parseInt(document.getElementById("numPeople").value);
      
      const tipAmount = customTip > 0 ? customTip : (billAmount * tipPercentage) / 100;
      const totalAmount = billAmount + tipAmount;
      const perPerson = totalAmount / numPeople;
  
      // Format with INR currency
      document.getElementById("tipAmount").textContent = formatCurrency(tipAmount);
      document.getElementById("totalAmount").textContent = formatCurrency(totalAmount);
      document.getElementById("perPerson").textContent = formatCurrency(perPerson);
    }
  });
  
  function updateResultsWithoutCurrency() {
    document.getElementById("tipAmount").textContent = document.getElementById("tipAmount").textContent.replace(/[^\d.-]/g, '');
    document.getElementById("totalAmount").textContent = document.getElementById("totalAmount").textContent.replace(/[^\d.-]/g, '');
    document.getElementById("perPerson").textContent = document.getElementById("perPerson").textContent.replace(/[^\d.-]/g, '');
  }
  
  // Save History
  document.getElementById("saveHistoryBtn").addEventListener("click", function() {
    const billAmount = parseFloat(document.getElementById("billAmount").value);
    const tipPercentage = parseInt(document.getElementById("tipPercentage").value);
    const customTip = parseFloat(document.getElementById("customTip").value);
    const numPeople = parseInt(document.getElementById("numPeople").value);
    
    const tipAmount = customTip > 0 ? customTip : (billAmount * tipPercentage) / 100;
    const totalAmount = billAmount + tipAmount;
    const perPerson = totalAmount / numPeople;
  
    // Save to localStorage
    const history = JSON.parse(localStorage.getItem("tipHistory")) || [];
    history.push({
      billAmount,
      tipAmount,
      totalAmount,
      perPerson,
      numPeople
    });
  
    // Store updated history in localStorage
    localStorage.setItem("tipHistory", JSON.stringify(history));
  
    // Update history display
    displayHistory();
  });
  
  // Display History
  function displayHistory() {
    const history = JSON.parse(localStorage.getItem("tipHistory")) || [];
    const historyList = document.getElementById("historyList");
  
    // Clear current history
    historyList.innerHTML = "";
  
    // Display each history entry
    history.forEach(item => {
      const li = document.createElement("li");
      li.textContent = `Bill: ₹${item.billAmount.toFixed(2)}, Tip: ₹${item.tipAmount.toFixed(2)}, Total: ₹${item.totalAmount.toFixed(2)}, Per Person: ₹${item.perPerson.toFixed(2)}, People: ${item.numPeople}`;
      historyList.appendChild(li);
    });
  }
  
  // Clear History
  document.getElementById("clearHistoryBtn").addEventListener("click", function() {
    localStorage.removeItem("tipHistory");
    displayHistory();
  });
  
  // Display history when the page loads
  window.onload = displayHistory;
  