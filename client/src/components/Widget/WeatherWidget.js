import React from 'react';
import PropTypes from 'utils/propTypes';

import classNames from 'classnames';

import { Card, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap';

const WeatherWidget = ({
  bgColor,
  icon: Icon,
  iconProps,
  info,
  className,
  ...restProps
}) => {
  const classes = classNames('cr-widget', className, {
    [`bg-${bgColor}`]: bgColor,
  });
  return (
    <Card inverse className={classes} {...restProps}>
      <CardBody className="cr-widget__icon">
        <Icon size={50} {...iconProps} />
      </CardBody>
      <CardBody>
        <CardTitle>오늘 날씨</CardTitle>
        <CardSubtitle>{info.temp}도</CardSubtitle>
        <CardSubtitle>{info.description}</CardSubtitle>
      </CardBody>
    </Card>
  );
};

WeatherWidget.propTypes = {
  bgColor: PropTypes.string,
  icon: PropTypes.component,
  iconProps: PropTypes.object,
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

WeatherWidget.defaultProps = {
  bgColor: 'primary',
  icon: 'span',
  iconProps: { size: 50 },
};

export default WeatherWidget;
