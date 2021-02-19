import React from "react";
import { Row, Col } from "antd";

import Pie from "./pie";
import Bar from "./bar";
const Home: React.FC = () => {
  return (
    <Row>
      <Col span="12">
        <Pie />
      </Col>
      <Col span="12">
        <Bar />
      </Col>
    </Row>
  );
};

export default Home;
