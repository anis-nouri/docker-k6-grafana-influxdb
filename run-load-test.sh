#!/bin/bash

# Start Prometheus and Grafana containers
docker-compose up -d prometheus grafana

# Display load testing dashboard URL
echo "--------------------------------------------------------------------------------------"
echo "Load testing with Grafana dashboard: http://localhost:3000/d/k6/k6-load-testing-results"
echo "--------------------------------------------------------------------------------------"

# Define an array of test scripts
test_scripts=(
  "load-test.js"
)

# Run each test script
for script in "${test_scripts[@]}"; do
  echo "Starting $script..."
  docker-compose run --rm k6 run "/scripts/$script"
  echo "$script done."
  sleep 60
done
echo "--------------------"
echo "All tests completed."
echo "--------------------"