const SectionTitle = ({ title, subtitle }) => {
  return (
    <div className="space-y-4 lg:space-y-6">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-teal-800 text-center">
        {title}
      </h2>
      <p className=" text-center max-w-2xl mx-auto text-gray-500">{subtitle}</p>
    </div>
  );
};

export default SectionTitle;
