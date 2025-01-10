import React, { useState } from "react";

function PropertyForm() {
  const [formData, setFormData] = useState({
    id: 75,
    price: 300000,
    first_name: "fname1733766513",
    last_name: "lname1733766513",
    email: "email@example.com",
    title: "Ms.",
    phone: "1-888-454-1234",
    preferred_property_types: "Student Rental, Multi-family unit",
    preferred_locations: "SE, NE",
    bedrooms_max: 8,
    bedrooms_min: 2,
    bathrooms_max: 3,
    bathrooms_min: 2,
    budget_max: 2343,
    budget_min: 343.33,
    years_built_min: 5,
    years_built_max: 30,
    investment_purpose: "rental",
    assigned_parking_required: true,
    central_heat_required: true,
    dishwasher_required: true,
    balcony_required: false,
    financing_sources: [
      {
        id: 39,
        mortgages: [
          {
            id: 26,
            appraisal_value: 345555,
            down_payment: 27665,
            principal: 234343,
            issued_date: "2024-12-09T12:48:33",
            pre_qualified: true,
            pre_approved: false,
            loan_to_value: 80,
            interest_rate: 5,
            term: 5,
            amortization_period: 30,
            monthly_payment: 2343.55,
            owner_occupied: true,
            insurance: 200,
          },
        ],
      },
    ],
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setFormData({ ...formData, [name]: checked });
  };

  const handleMortgageChange = (sourceIndex, mortgageIndex, event) => {
    const { name, value } = event.target;
    const updatedSources = [...formData.financing_sources];
    updatedSources[sourceIndex].mortgages[mortgageIndex][name] = value;
    setFormData({ ...formData, financing_sources: updatedSources });
  };

  const handleMortgageCheckboxChange = (sourceIndex, mortgageIndex, event) => {
    const { name, checked } = event.target;
    const updatedSources = [...formData.financing_sources];
    updatedSources[sourceIndex].mortgages[mortgageIndex][name] = checked;
    setFormData({ ...formData, financing_sources: updatedSources });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Process and structure the data as needed
    console.log(formData);
    // You can send structuredData to your backend or perform further processing
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          First Name:
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Last Name:
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Phone:
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Preferred Property Types:
          <input
            type="text"
            name="preferred_property_types"
            value={formData.preferred_property_types}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Preferred Locations:
          <input
            type="text"
            name="preferred_locations"
            value={formData.preferred_locations}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Bedrooms Max:
          <input
            type="number"
            name="bedrooms_max"
            value={formData.bedrooms_max}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Bedrooms Min:
          <input
            type="number"
            name="bedrooms_min"
            value={formData.bedrooms_min}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Bathrooms Max:
          <input
            type="number"
            name="bathrooms_max"
            value={formData.bathrooms_max}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Bathrooms Min:
          <input
            type="number"
            name="bathrooms_min"
            value={formData.bathrooms_min}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Budget Max:
          <input
            type="number"
            name="budget_max"
            value={formData.budget_max}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Budget Min:
          <input
            type="number"
            name="budget_min"
            value={formData.budget_min}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Years Built Min:
          <input
            type="number"
            name="years_built_min"
            value={formData.years_built_min}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Years Built Max:
          <input
            type="number"
            name="years_built_max"
            value={formData.years_built_max}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Investment Purpose:
          <input
            type="text"
            name="investment_purpose"
            value={formData.investment_purpose}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Assigned Parking Required:
          <input
            type="checkbox"
            name="assigned_parking_required"
            checked={formData.assigned_parking_required}
            onChange={handleCheckboxChange}
          />
        </label>
        <br />
        <label>
          Central Heat Required:
          <input
            type="checkbox"
            name="central_heat_required"
            checked={formData.central_heat_required}
            onChange={handleCheckboxChange}
          />
        </label>
        <br />
        <label>
          Dishwasher Required:
          <input
            type="checkbox"
            name="dishwasher_required"
            checked={formData.dishwasher_required}
            onChange={handleCheckboxChange}
          />
        </label>
        <br />
        <label>
          Balcony Required:
          <input
            type="checkbox"
            name="balcony_required"
            checked={formData.balcony_required}
            onChange={handleCheckboxChange}
          />
        </label>
        <br />
        {formData.financing_sources.map((source, sourceIndex) => (
          <div key={source.id}>
            <h3>Financing Source {sourceIndex + 1}</h3>
            {source.mortgages.map((mortgage, mortgageIndex) => (
              <div key={mortgage.id}>
                <h4>Mortgage {mortgageIndex + 1}</h4>
                <label>
                  Appraisal Value:
                  <input
                    type="number"
                    name="appraisal_value"
                    value={mortgage.appraisal_value}
                    onChange={(e) =>
                      handleMortgageChange(sourceIndex, mortgageIndex, e)
                    }
                  />
                </label>
                <br />
                <label>
                  Down Payment:
                  <input
                    type="number"
                    name="down_payment"
                    value={mortgage.down_payment}
                    onChange={(e) =>
                      handleMortgageChange(sourceIndex, mortgageIndex, e)
                    }
                  />
                </label>
                <br />
                <label>
                  Principal:
                  <input
                    type="number"
                    name="principal"
                    value={mortgage.principal}
                    onChange={(e) =>
                      handleMortgageChange(sourceIndex, mortgageIndex, e)
                    }
                  />
                </label>
                <br />
                <label>
                  Issued Date:
                  <input
                    type="date"
                    name="issued_date"
                    value={mortgage.issued_date}
                    onChange={(e) =>
                      handleMortgageChange(sourceIndex, mortgageIndex, e)
                    }
                  />
                </label>
                <br />
                <label>
                  Pre-Qualified:
                  <input
                    type="checkbox"
                    name="pre_qualified"
                    checked={mortgage.pre_qualified}
                    onChange={(e) =>
                      handleMortgageCheckboxChange(
                        sourceIndex,
                        mortgageIndex,
                        e
                      )
                    }
                  />
                </label>
                <br />
                <label>
                  Pre-Approved:
                  <input
                    type="checkbox"
                    name="pre_approved"
                    checked={mortgage.pre_approved}
                    onChange={(e) =>
                      handleMortgageCheckboxChange(
                        sourceIndex,
                        mortgageIndex,
                        e
                      )
                    }
                  />
                </label>
                <br />
                <label>
                  Loan to Value:
                  <input
                    type="number"
                    name="loan_to_value"
                    value={mortgage.loan_to_value}
                    onChange={(e) =>
                      handleMortgageChange(sourceIndex, mortgageIndex, e)
                    }
                  />
                </label>
                <br />
                <label>
                  Interest Rate:
                  <input
                    type="number"
                    name="interest_rate"
                    value={mortgage.interest_rate}
                    onChange={(e) =>
                      handleMortgageChange(sourceIndex, mortgageIndex, e)
                    }
                  />
                </label>
                <br />
                <label>
                  Term:
                  <input
                    type="number"
                    name="term"
                    value={mortgage.term}
                    onChange={(e) =>
                      handleMortgageChange(sourceIndex, mortgageIndex, e)
                    }
                  />
                </label>
                <br />
                <label>
                  Amortization Period:
                  <input
                    type="number"
                    name="amortization_period"
                    value={mortgage.amortization_period}
                    onChange={(e) =>
                      handleMortgageChange(sourceIndex, mortgageIndex, e)
                    }
                  />
                </label>
                <br />
                <label>
                  Monthly Payment:
                  <input
                    type="number"
                    name="monthly_payment"
                    value={mortgage.monthly_payment}
                    onChange={(e) =>
                      handleMortgageChange(sourceIndex, mortgageIndex, e)
                    }
                  />
                </label>
                <br />
                <label>
                  Owner Occupied:
                  <input
                    type="checkbox"
                    name="owner_occupied"
                    checked={mortgage.owner_occupied}
                    onChange={(e) =>
                      handleMortgageCheckboxChange(
                        sourceIndex,
                        mortgageIndex,
                        e
                      )
                    }
                  />
                </label>
                <br />
                <label>
                  Insurance:
                  <input
                    type="number"
                    name="insurance"
                    value={mortgage.insurance}
                    onChange={(e) =>
                      handleMortgageChange(sourceIndex, mortgageIndex, e)
                    }
                  />
                </label>
                <br />
              </div>
            ))}
          </div>
        ))}
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}

export default PropertyForm;
