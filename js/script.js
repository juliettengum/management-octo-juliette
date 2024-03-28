
const addEmployeeBtn = document.getElementById("addEmployeeBtn");
const employeeList = document.getElementById("employeeList");
let employees = [];

addEmployeeBtn.addEventListener("click", addEmployee);

function addEmployee() {
  let firstName = prompt("Enter first name:");
  let lastName = prompt("Enter last name:");
  let salary = parseFloat(prompt("Enter salary:"));

  if (firstName && lastName && !isNaN(salary)) {
    let employee = { firstName, lastName, salary };
    employees.push(employee);
    displayEmployees();
    let continueAdding = confirm("Do you want to add another employee?");
    if (continueAdding) {
      addEmployee();
    } else {
      displayEmployees();
      computeAndDisplayStatistics(); 
    }
  } else {
    alert("Invalid input. Please try again.");
    addEmployee();
  }
}

function displayEmployees() {
  employeeList.innerHTML = "";
  employees.sort((a, b) => a.lastName.localeCompare(b.lastName));
  employees.forEach((employee) => {
    let employeeRow = document.createElement("tr");
    employeeRow.innerHTML = `
      <td>${employee.firstName}</td>
      <td>${employee.lastName}</td>
      <td>$${employee.salary.toFixed(2)}</td>
    `;
    employeeList.appendChild(employeeRow);
  });
}

function computeAndDisplayStatistics() {
  // Calculate statistics
  let totalSalary = employees.reduce((acc, curr) => acc + curr.salary, 0);
  let averageSalary = totalSalary / employees.length;

  // Find the employee with the closest salary to the average salary
  let closestEmployee = employees.reduce((prev, curr) => {
    return Math.abs(curr.salary - averageSalary) <
      Math.abs(prev.salary - averageSalary)
      ? curr
      : prev;
  });

  // Display the statistics
  console.log(
    `The average employees salary between our ${
      employees.length
    } employee(s) is $${averageSalary.toFixed(2)}`
  );

  console.log(
    `Congratulations to ${closestEmployee.firstName} ${closestEmployee.lastName}!, our randomly drawning winner!`
  );
}
