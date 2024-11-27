import React from 'react';

import {
  SubmitHandler,
  useForm,
} from 'react-hook-form';

interface VehicleRegistrationData {
  ownerName: string;
  contactNumber: string;
  vehicleModel: string;
  registrationNumber: string;
  vehicleColor: string;
}

const VehicleRegistrationForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VehicleRegistrationData>();

  const onSubmit: SubmitHandler<VehicleRegistrationData> = (data) => {
    alert("Form Submitted Successfully!");
    console.log(data);
  };

  return (
    <div>
      <h1>Vehicle Registration Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Owner Name */}
        <div>
          <label>Owner Name:</label>
          <input
            type="text"
            {...register("ownerName", { required: "Owner Name is required" })}
          />
          {errors.ownerName && <p>{errors.ownerName.message}</p>}
        </div>

        {/* Contact Number */}
        <div>
          <label>Contact Number:</label>
          <input
            type="text"
            {...register("contactNumber", {
              required: "Contact Number is required",
              pattern: {
                value: /^\d{10}$/,
                message: "Contact Number must be a 10-digit number",
              },
            })}
          />
          {errors.contactNumber && <p>{errors.contactNumber.message}</p>}
        </div>

        {/* Vehicle Model */}
        <div>
          <label>Vehicle Model:</label>
          <input
            type="text"
            {...register("vehicleModel", {
              required: "Vehicle Model is required",
            })}
          />
          {errors.vehicleModel && <p>{errors.vehicleModel.message}</p>}
        </div>

        {/* Registration Number */}
        <div>
          <label>Registration Number:</label>
          <input
            type="text"
            {...register("registrationNumber", {
              required: "Registration Number is required",
              pattern: {
                value: /^TS\d{2}[A-Z]{2}\d{4}$/,
                message: "Registration Number must match the format TS09EA1234",
              },
            })}
          />
          {errors.registrationNumber && (
            <p>{errors.registrationNumber.message}</p>
          )}
        </div>

        {/* Vehicle Color */}
        <div>
          <label>Vehicle Color:</label>
          <input
            type="text"
            {...register("vehicleColor", {
              required: "Vehicle Color is required",
            })}
          />
          {errors.vehicleColor && <p>{errors.vehicleColor.message}</p>}
        </div>

        {/* Submit Button */}
        <button type="submit">Register Vehicle</button>
      </form>
    </div>
  );
};

export default VehicleRegistrationForm;
