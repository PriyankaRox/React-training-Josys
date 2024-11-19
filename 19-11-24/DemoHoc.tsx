import React, { Component } from "react";
import axios from "axios";

interface GridHocProps {
  url: string;
  dataProperties: string[];
}

interface GridState<T> {
  data: T[];
  loading: boolean;
  error: string | null;
}

function DemoHoc<T>(
  WrappedComponent: React.ComponentType<{
    data: T[];
    loading: boolean;
    error: string | null;
  }>
) {
  return class GridComponent extends Component<GridHocProps, GridState<T>> {
    state: GridState<T> = {
      data: [],
      loading: true,
      error: null,
    };

    componentDidMount() {
      const { url } = this.props;

      axios
        .get<T[]>(url)
        .then((response) => {
          this.setState({ data: response.data, loading: false, error: null });
        })
        .catch((error) => {
          this.setState({ data: [], loading: false, error: error.message });
        });
    }

    render() {
      const { data, loading, error } = this.state;

      return <WrappedComponent data={data} loading={loading} error={error} />;
    }
  };
}

export default DemoHoc;
