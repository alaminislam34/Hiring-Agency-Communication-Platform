const SectionTitle = ({ title }) => {
  return (
    <div>
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-blue-950 text-center py-6">
        {title}
      </h2>
    </div>
  );
};

export default SectionTitle;
