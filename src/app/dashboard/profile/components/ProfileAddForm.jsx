export default function ProfileAddForm() {
  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6">Full Name</h1>

      <div className="space-y-5">
        {/* Form Fields in Two Columns */}
        <div className="grid grid-cols-2 gap-4">
          <div className="form-control flex flex-col">
            <label className="label">
              <span className="label-text">Full Name</span>
            </label>
            <input type="text" className="input input-bordered" />
          </div>
          <div className="form-control flex flex-col">
            <label className="label">
              <span className="label-text">Job Title</span>
            </label>
            <input type="text" className="input input-bordered" />
          </div>

          <div className="form-control flex flex-col">
            <label className="label">
              <span className="label-text font-semibold">Phone</span>
            </label>
            <input type="tel" className="input input-bordered" />
          </div>
          <div className="form-control flex flex-col">
            <label className="label">
              <span className="label-text font-semibold">Email address</span>
            </label>
            <input type="email" className="input input-bordered" />
          </div>

          <div className="form-control flex flex-col">
            <label className="label">
              <span className="label-text font-semibold">Website</span>
            </label>
            <input type="url" className="input input-bordered" />
          </div>
          <div className="form-control flex flex-col">
            <label className="label">
              <span className="label-text font-semibold">
                Current Salary($)
              </span>
            </label>
            <select className="select select-bordered">
              <option>40-70 K</option>
              <option>70-100 K</option>
              <option>100-150 K</option>
            </select>
          </div>

          <div className="form-control flex flex-col">
            <label className="label">
              <span className="label-text font-semibold">
                Expected Salary($)
              </span>
            </label>
            <select className="select select-bordered">
              <option>120-150 K</option>
              <option>150-200 K</option>
              <option>200-350 K</option>
            </select>
          </div>
          <div className="form-control flex flex-col">
            <label className="label">
              <span className="label-text font-semibold">Experience</span>
            </label>
            <input type="text" className="input input-bordered" />
          </div>

          <div className="form-control flex flex-col">
            <label className="label">
              <span className="label-text font-semibold">Age</span>
            </label>
            <input type="text" className="input input-bordered" />
          </div>
          <div className="form-control flex flex-col">
            <label className="label">
              <span className="label-text font-semibold">Education Levels</span>
            </label>
            <input type="text" className="input input-bordered" />
          </div>

          <div className="form-control flex flex-col">
            <label className="label">
              <span className="label-text font-semibold">Languages</span>
            </label>
            <input type="text" className="input input-bordered" />
          </div>
        </div>

        {/* Description Field Full Width */}
        <div className="form-control flex flex-col">
          <label className="label">
            <span className="label-text font-semibold">Description</span>
          </label>
          <textarea
            className="textarea textarea-bordered w-full"
            rows="4"
          ></textarea>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button className="btn btn-primary">Save</button>
        </div>
      </div>
    </div>
  );
}
