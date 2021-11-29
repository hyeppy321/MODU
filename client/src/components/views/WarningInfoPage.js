import Page from 'components/Page';
import React, { useEffect, useState } from 'react';
import {
  RiNumber1,
  RiNumber2,
  RiNumber3,
  RiNumber4,
  RiAlarmWarningLine,
  RiAlarmWarningFill,
} from 'react-icons/ri';
import { NumberWidget, IconWidget } from '../../components/Widget';
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Badge,
  Button,
  Form,
  Input,
  Label,
} from 'reactstrap';

function WarningInfoPage(props) {
  const [IsClick, setIsClick] = useState(0);
  const [WidgetColor1, setWidgetColor1] = useState('navy');
  const [WidgetColor2, setWidgetColor2] = useState('warning');
  const [WidgetColor3, setWidgetColor3] = useState('danger');
  const [WidgetColor4, setWidgetColor4] = useState('blackgray');
  const [WidgetColor5, setWidgetColor5] = useState('special');
  const levelname = [
    '여행경보제도란?',
    '1단계 : 남색경보',
    '2단계 : 황색경보',
    '3단계 : 적색경보',
    '4단계 : 흑색경보',
    '특별여행주의보(외교부 훈령[여행경보제도 운영지침])',
  ];
  const levelexplain = [
    '외교부는 해외에서 우리 국민에 대한 사건·사고 피해를 예방하고 우리 국민의 안전한 해외 거주·체류 및 방문을 도모하기 위해 2004년부터 ‘여행경보제도’를 운영해 오고 있습니다.\n우리 국민이 스스로의 안전을 위하여 합리적으로 판단하고 위험에 사전 대비할 수 있도록 우리 국민의 거주·체류 및 방문에 주의가 요구되는 국가(지역)의 위험 수준을 알리고 그에 따른 행동요령을 안내합니다.\n\n※ 위험 수준은 해당 국가(지역) 내 범죄, 정정불안, 보건, 테러, 재난 및 기타 상황을 종합적으로 고려하여 평가합니다.',
    '여행유의 \n 신변안전 위험 요인 숙지·대비',
    '여행자제 \n (여행예정자) 불필요한 여행 자제 \n (체류자) 신변안전 특별유의',
    '출국권고 \n (여행예정자) 여행 취소·연기 \n (체류자) 긴요한 용무가 아닌 한 출국',
    '여행금지\n(여행예정자) 여행금지 준수\n(체류자) 즉시 대피·철수',
    '(발령 기준) 단기적으로 긴급한 위험이 있는 경우\n(행동요령) 여행경보 2단계(여행자제) 이상 3단계(출국권고) 이하에 준함\n(기간) 발령일로부터 최대 90일까지 유효(통상 1개월 단위로 발령)',
  ];

  return (
    <Page
      className="WarningInfoPage"
      title="여행 경보"
      description="여행경보제도에 따른 단게별 경보정보를 제공합니다. 여행경보를 클릭하여 위험수준을 확인해보세요."
      breadcrumbs={[{ name: 'warningInfo', active: true }]}
    >
      <Row>
        <Col lg={4} md={6} sm={6} xs={12} className="mb-3">
          <IconWidget
            bgColor={WidgetColor1}
            icon={RiNumber1}
            title="1단계 : 남색경보"
            subtitle={'여행유의'}
            Onclick={() => {
              setIsClick(1);
            }}
            OnMouseOver={() => {
              setWidgetColor1('gray');
            }}
            OnMouseOut={() => {
              setWidgetColor1('navy');
            }}
          />
        </Col>
        <Col lg={4} md={6} sm={6} xs={12} className="mb-3">
          <IconWidget
            bgColor={WidgetColor2}
            icon={RiNumber2}
            title="2단계 : 황색경보"
            subtitle={'여행자제'}
            Onclick={() => {
              setIsClick(2);
            }}
            OnMouseOver={() => {
              setWidgetColor2('gray');
            }}
            OnMouseOut={() => {
              setWidgetColor2('warning');
            }}
          />
        </Col>
        <Col lg={4} md={6} sm={6} xs={12} className="mb-3">
          <IconWidget
            bgColor={WidgetColor3}
            icon={RiNumber3}
            title="3단계 : 적색경보"
            subtitle={'출국권고'}
            Onclick={() => {
              setIsClick(3);
            }}
            OnMouseOver={() => {
              setWidgetColor3('gray');
            }}
            OnMouseOut={() => {
              setWidgetColor3('danger');
            }}
          />
        </Col>
        <Col lg={4} md={6} sm={6} xs={12} className="mb-3">
          <IconWidget
            bgColor={WidgetColor4}
            icon={RiNumber4}
            title="4단계 : 흑색경보"
            subtitle={'여행금지'}
            Onclick={() => {
              setIsClick(4);
            }}
            OnMouseOver={() => {
              setWidgetColor4('gray');
            }}
            OnMouseOut={() => {
              setWidgetColor4('blackgray');
            }}
          />
        </Col>
        <Col lg={4} md={6} sm={6} xs={12} className="mb-3">
          <IconWidget
            bgColor={WidgetColor5}
            icon={RiAlarmWarningLine}
            title="특별여행주의보"
            subtitle={'단기간시행'}
            Onclick={() => {
              setIsClick(5);
            }}
            OnMouseOver={() => {
              setWidgetColor5('gray');
            }}
            OnMouseOut={() => {
              setWidgetColor5('special');
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Card className="mb-3">
            <CardHeader tag="h5">{levelname[0]}</CardHeader>
            <CardBody>{levelexplain[0]}</CardBody>
          </Card>
        </Col>
      </Row>
      {IsClick != 0 && (
        <Row>
          <Col>
            <Card className="mb-3">
              <CardHeader tag="h5">{levelname[IsClick]}</CardHeader>
              <CardBody>{levelexplain[IsClick]}</CardBody>
            </Card>
          </Col>
        </Row>
      )}
    </Page>
  );
}

export default WarningInfoPage;
