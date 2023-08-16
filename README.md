# docker-k6-grafana-prometheus
Demonstrates how to run load tests with containerised instances of K6, Grafana and prometheus.

#### Dashboards
The dashboard in /dashboards is adapted from the excellent K6 / Grafana dashboard here:
https://grafana.com/grafana/dashboards/18030-official-k6-test-result/

There are only two small modifications:
* the data source is configured to use the docker created prometheus data source
