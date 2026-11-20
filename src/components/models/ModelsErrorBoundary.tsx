import { Component, type ReactNode } from "react";
import { clearAllModelsFromStorage } from "@/lib/models/storage";
import { ModelsErrorFallback } from "./ModelsErrorFallback";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ModelsErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error(
      "[ModelsErrorBoundary] Caught models page crash:",
      error,
      errorInfo,
    );
  }

  handleClearAndReload = () => {
    clearAllModelsFromStorage();
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      const msg =
        this.state.error?.message || "Unknown rendering error in Models hub";
      return (
        <ModelsErrorFallback
          errorMessage={msg}
          onClearAndReload={this.handleClearAndReload}
          onReset={() => this.setState({ hasError: false, error: null })}
        />
      );
    }
    return this.props.children;
  }
}
