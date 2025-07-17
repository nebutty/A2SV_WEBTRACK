import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";


type FormValues = {
  name: string;
  email: string;
  message: string;
};

export const YouTubeForm = () => {
  const form = useForm<FormValues>({ mode: "onBlur" });
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = (data: FormValues) => {
    
  };

  return (
    <div className="youtube-form">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <h2>Contact Us</h2>

        <label htmlFor="name">Name</label>
        <input
          id="name"
          className={errors.name ? "error" : ""}
          {...register("name", {
            required: { value: true, message: "Name is required" },
          })}
        />
        {errors.name && (
          <p role="alert" className="error-message">
            {errors.name.message}
          </p>
        )}

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          className={errors.email ? "error" : ""}
          {...register("email", {
            required: { value: true, message: "Email is required" },
            pattern: {
              value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i,
              message: "Invalid email format",
            },
          })}
        />
        {errors.email && (
          <p role="alert" className="error-message">
            {errors.email.message}
          </p>
        )}

        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          rows={4}
          className={errors.message ? "error" : ""}
          {...register("message", {
            required: { value: true, message: "Message is required" },
          })}
        />
        {errors.message && (
          <p role="alert" className="error-message">
            {errors.message.message}
          </p>
        )}

        <button type="submit">Send</button>
      </form>

      <DevTool control={control} />
    </div>
  );
};
