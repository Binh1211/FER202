
function People() {
  const people = [
    { name: "Jack", age: 50 },
    { name: "Michael", age: 9 },
    { name: "John", age: 40 },
    { name: "Ann", age: 19 },
    { name: "Elisabeth", age: 16 },
  ];

  const firstTeenager = people.find(
    (person) => person.age >= 10 && person.age <= 20
  );

  const allTeenagers = people.filter(
    (person) => person.age >= 10 && person.age <= 20
  );

  const everyIsTeenager = people.every(
    (person) => person.age >= 10 && person.age <= 20
  );

  const anyIsTeenager = people.some(
    (person) => person.age >= 10 && person.age <= 20
  );
  return (
    <div>
      <h1>ES6 People Array Exercises</h1>

      <div>
        <h2>Original people array:</h2>
        <table
          style={{
            borderCollapse: "collapse",
            width: "15%",
            margin: "20px 0",
            fontFamily: "Arial, sans-serif",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#f2f2f2" }}>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  textAlign: "left",
                }}
              >
                Name
              </th>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  textAlign: "left",
                }}
              >
                Age
              </th>
            </tr>
          </thead>
          <tbody>
            {people.map((person, index) => (
              <tr
                key={index}
                style={{
                  backgroundColor: index % 2 === 0 ? "#ffffff" : "#f9f9f9",
                }}
              >
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                  }}
                >
                  {person.name}
                </td>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                  }}
                >
                  {person.age}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h2>1. First teenager:</h2>
        <table
          style={{
            borderCollapse: "collapse",
            width: "15%",
            margin: "20px 0",
            fontFamily: "Arial, sans-serif",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#f2f2f2" }}>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  textAlign: "left",
                }}
              >
                Name
              </th>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  textAlign: "left",
                }}
              >
                Age
              </th>
            </tr>
          </thead>
          <tbody>
            {firstTeenager && (
              <tr
                style={{
                  backgroundColor: "#ffffff",
                }}
              >
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                  }}
                >
                  {firstTeenager.name}
                </td>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                  }}
                >
                  {firstTeenager.age}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div>
        <h2>2. All teenagers:</h2>
        <table
          style={{
            borderCollapse: "collapse",
            width: "15%",
            margin: "20px 0",
            fontFamily: "Arial, sans-serif",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#f2f2f2" }}>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  textAlign: "left",
                }}
              >
                Name
              </th>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  textAlign: "left",
                }}
              >
                Age
              </th>
            </tr>
          </thead>
          <tbody>
            {allTeenagers.map((person, index) => (
              <tr
                key={index}
                style={{
                  backgroundColor: index % 2 === 0 ? "#ffffff" : "#f9f9f9",
                }}
              >
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                  }}
                >
                  {person.name}
                </td>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                  }}
                >
                  {person.age}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h2>3. Every person is teenager:</h2>
        <div>{JSON.stringify(everyIsTeenager)}</div>
      </div>

      <div>
        <h2>4. Any person is teenager:</h2>
        <div>{JSON.stringify(anyIsTeenager)}</div>
      </div>
    </div>
  );
}

export default People;
