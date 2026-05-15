const leads = [
  {
    id: 1,
    name: "John Doe",
    company: "Tech Solutions Inc.",
    email: "john@techsolutions.com",
    score: "Hot",
    status: "Email Sent",
  },
  {
    id: 2,
    name: "Jane Smith",
    company: "Marketing Pro",
    email: "jane@marketingpro.io",
    score: "Warm",
    status: "Replied",
  },
  {
    id: 3,
    name: "Robert Brown",
    company: "BuildBetter LLC",
    email: "robert@buildbetter.com",
    score: "Cold",
    status: "New",
  },
  {
    id: 4,
    name: "Alice Wilson",
    company: "DesignFlow",
    email: "alice@designflow.co",
    score: "Hot",
    status: "Meeting Booked",
  },
];

const scoreColors = {
  Hot: "bg-red-100 text-red-800",
  Warm: "bg-orange-100 text-orange-800",
  Cold: "bg-blue-100 text-blue-800",
};

export default function LeadsTable() {
  return (
    <div className="mt-8 flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Company
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Score
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {leads.map((lead) => (
                  <tr key={lead.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {lead.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {lead.company}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {lead.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          scoreColors[lead.score as keyof typeof scoreColors]
                        }`}
                      >
                        {lead.score}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {lead.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
