interface ProductSpecificationsProps {
  specifications: Record<string, string>
}

export default function ProductSpecifications({ specifications }: ProductSpecificationsProps) {
  const specEntries = Object.entries(specifications)

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold">Technical Specifications</h3>

      <div className="grid gap-4">
        {specEntries.map(([key, value], index) => (
          <div
            key={key}
            className={`grid grid-cols-1 md:grid-cols-3 gap-4 py-4 ${
              index !== specEntries.length - 1 ? "border-b border-gray-200" : ""
            }`}
          >
            <div className="font-semibold text-gray-900">{key}</div>
            <div className="md:col-span-2 text-gray-700">{value}</div>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 p-6 rounded-lg">
        <h4 className="font-semibold text-blue-900 mb-2">Need More Information?</h4>
        <p className="text-blue-800 text-sm">
          Can't find the specification you're looking for? Contact our technical support team for detailed product
          information.
        </p>
      </div>
    </div>
  )
}
