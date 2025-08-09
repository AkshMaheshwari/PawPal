export default function DonateSection({ icon: Icon, title, description }) {
  return (
    <div className="px-4 py-8 md:px-8 md:py-12 bg-gray-50">
      <Icon className="h-6 w-6 text-yellow-600 mx-auto mb-3" />
      <h2 className="text-2xl md:text-3xl font-semibold mb-3 text-center text-gray-900 tracking-tight">
        {title}
      </h2>

      <p className="max-w-md mx-auto text-base md:text-lg text-gray-600 text-center leading-relaxed">
        {description}
      </p>
    </div>
  );
}
