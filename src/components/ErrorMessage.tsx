import React from "react";
import { AppError } from "../types/inference";
import {
  FiWifiOff,
  FiClock,
  FiAlertTriangle,
  FiHelpCircle,
} from "react-icons/fi";

const ICON_MAP: Record<AppError["type"], React.ReactNode> = {
  network_offline: <FiWifiOff size={18} />,
  rate_limit: <FiClock size={18} />,
  provider_error: <FiAlertTriangle size={18} />,
  validation_error: <FiAlertTriangle size={18} />,
  unknown: <FiHelpCircle size={18} />,
};

interface ErrorMessageProps {
  error: AppError;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => (
  <div
    className="
      animate-slide-up flex items-start gap-3 px-4 py-3.5 rounded-xl
      bg-red-500/10 border border-red-500/20
      max-w-2xl mx-auto w-full
    "
    role="alert"
  >
    <span className="text-red-400 flex-shrink-0 mt-0.5">
      {ICON_MAP[error.type]}
    </span>
    <p className="font-body text-red-300/90 text-sm leading-relaxed">
      {error.message}
    </p>
  </div>
);

export default ErrorMessage;
