const SectionTitle = ({ title, subtitle }) => {
  return (
    <div>
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-teal-800 text-center py-6">
        {title}
      </h2>
      <p className=" text-center my-4">{subtitle}</p>
    </div>
  );
};

export default SectionTitle;
