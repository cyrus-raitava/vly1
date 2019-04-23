/* eslint-disable no-console */
import React, { Component } from 'react';
import { Form, Input, Button, Row, Col, Divider, Radio } from 'antd';
const { TextArea } = Input;
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class PersonDetailForm extends Component {
  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // eslint-disable-next-line no-console
        console.log('Received values of form: ', values);
        // TODO Send new person to database and update the store.
        const person = this.props.person;
        person.title = values.title;
        person.subtitle = values.subtitle;
        person.duration = values.duration;
        person.location = values.location;
        person.description = values.description;
        person.imgUrl = values.imgUrl;
        person.status = values.status;

        this.props.onSubmit(this.props.person);
      }
    });
  }

  render() {
    // get translated labels
    const opTitle = (<FormattedMessage id="opTitle" defaultMessage="Title" description="opportunity Title label in OpDetails Form" />);
    const opSubtitle = (<FormattedMessage id="opSubtitle" defaultMessage="Subtitle" description="opportunity Subtitle label in OpDetails Form" />);
    const opCommitment = (<FormattedMessage id="opCommitment" defaultMessage="Commitment" description="opportunity Commitment label in OpDetails Form" />);
    const opLocation = (<FormattedMessage id="opLocation" defaultMessage="Location" description="opportunity Location label in OpDetails Form" />);
    const opDescription = (<FormattedMessage id="opDescription" defaultMessage="Description" description="opportunity Description label in OpDetails Form" />);
    const opImgUrl = (<FormattedMessage id="opImgUrl" defaultMessage="Image Link" description="opportunity Image URL label in OpDetails Form" />);
    const opStatus = (<FormattedMessage id="opStatus" defaultMessage="Status" description="Draft or published status" />);
    const {
      getFieldDecorator, getFieldsError, getFieldError, isFieldTouched,
    } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
        md: { span: 16 },
      },
    };

    // Only show error after a field is touched.
    const titleError = isFieldTouched('title') && getFieldError('title');

    return (
      <div className="PersonDetailForm">
        <Form
          {...formItemLayout}
          onSubmit={this.handleSubmit}
          hideRequiredMark
          colon={false}
        >
          <Row>
            <Col
              xs={{ span: 24 }}
              md={{ span: 8 }}
            >
              <h2>1. What are you looking for?</h2>
              <p>Before our skilled volunteers get involved, they need to know how
                they can help. Add a title and description to your request to attract
                volunteers
              </p>
            </Col>
            <Col
              xs={{ span: 24 }}
              md={{ span: 16 }}
            >
              <Form.Item
                label={opTitle}
                validateStatus={titleError ? 'error' : ''}
                help={titleError || ''}
              >
                {getFieldDecorator('title', {
                  rules: [
                    { required: true, message: 'Title is required' },
                  ],
                })(
                  <Input placeholder="Title" />
                )}
              </Form.Item>
              <Form.Item label={opSubtitle}>
                {getFieldDecorator('subtitle', {
                  rules: [

                  ],
                })(
                  <Input placeholder="short summary that appears on the listing." />
                )}
              </Form.Item>
              <Form.Item label={opDescription}>
                {getFieldDecorator('description', {
                  rules: [

                  ],
                })(
                  <TextArea rows={20} placeholder="All the details about the request. You can use markdown here." />
                )}

              </Form.Item>
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col
              xs={{ span: 24 }}
              md={{ span: 8 }}
            >
              <h2>2. Where and when? (optional)</h2>
              <p>If you know when you'll need help, or where - this will help
                volunteers to organise logistics and increase volunteer numbers.
              </p>
            </Col>
            <Col
              xs={{ span: 24 }}
              md={{ span: 16 }}
            >
              <Form.Item label={opCommitment}>
                {getFieldDecorator('duration', {
                  rules: [
                    { required: true, message: 'Commitment level is required' },
                  ],
                })(
                  <Input placeholder="4 hours" />
                )}
              </Form.Item>
              <Form.Item label={opLocation}>
                {getFieldDecorator('location', {
                  rules: [

                  ],
                })(
                  <Input placeholder="school or somewhere else?" />
                )}
              </Form.Item>
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col
              xs={{ span: 24 }}
              md={{ span: 8 }}
            >
              <h2>3. Illustration? (optional)</h2>
              <p>Requests with photos get more responses.
                If you don't have a photo leave blank and we will provide one
                based on the category.
              </p>
            </Col>
            <Col
              xs={{ span: 24 }}
              md={{ span: 16 }}
            >
              <Form.Item label={opImgUrl}>
                {getFieldDecorator('imgUrl', {
                  rules: [
                    { type: 'url', message: 'a URL is required' },
                  ],
                })(
                  <Input placeholder="http://example.com/image.jpg" />
                )}
              </Form.Item>
              <Form.Item label={opStatus}>
                {getFieldDecorator('status', {
                  rules: [
                    { required: true, message: 'status is required' },
                  ],
                })(
                  <Radio.Group buttonStyle="solid">
                    <Radio.Button value="draft">Draft</Radio.Button>
                    <Radio.Button value="active">Active</Radio.Button>
                    <Radio.Button value="done">Done</Radio.Button>
                  </Radio.Group>
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col
              style={{ textAlign: 'right' }}
              xs={{ span: 24, offset: 0 }}
              md={{ span: 8, offset: 12 }}
            >
              <Button
                type="secondary"
                htmlType="button"
                onClick={this.props.onCancel}
              >
                <FormattedMessage
                  id="cancel"
                  defaultMessage="Cancel"
                  description="Label for cancel button on opportunity details form"
                />
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                disabled={hasErrors(getFieldsError())}
                style={{ marginLeft: 8 }}
              >
                <FormattedMessage
                  id="saveOpportunity"
                  defaultMessage="Save"
                  description="Label for submit button on opportunity details form"
                />
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

PersonDetailForm.propTypes = {
  person: PropTypes.shape({
    _id: PropTypes.string,
    cuid: PropTypes.string,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    imgUrl: PropTypes.any,
    duration: PropTypes.string,
    location: PropTypes.string,
    status: PropTypes.string,
  }),
  form: PropTypes.object,
  params: PropTypes.shape({
    cuid: PropTypes.string.isRequired,
  }),
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  // dispatch: PropTypes.func.isRequired,
};

// TODO replace imageURL field with uploader.
      // <Form.Item
      //     label="Image"
      //   >
      //     <div className="dropbox">
      //       {getFieldDecorator('dragger', {
      //         valuePropName: 'fileList',
      //         getValueFromEvent: this.normFile,
      //       })(
      //         <Upload.Dragger name="files" action="">
      //           <p className="ant-upload-drag-icon">
      //             <Icon type="inbox" />
      //           </p>
      //           <p className="ant-upload-text">Click or drag file to this area to upload</p>
      //           <p className="ant-upload-hint">Image ideal is 4:3 aspect ratio.</p>
      //         </Upload.Dragger>
      //       )}
      //     </div>
      //   </Form.Item>

export default Form.create({
  name: 'opportunity_detail_form',
  onFieldsChange(props, changedFields) {
    console.log('onFieldsChange', changedFields);
    // props.onChange(changedFields);
  },
  mapPropsToFields(props) {
    console.log('mapPropsToFields', props);
    return {
      title: Form.createFormField({ ...props.person.title, value: props.person.title }),
      subtitle: Form.createFormField({ ...props.person.subtitle, value: props.person.subtitle }),
      description: Form.createFormField({ ...props.person.description, value: props.person.description }),
      duration: Form.createFormField({ ...props.person.duration, value: props.person.duration }),
      location: Form.createFormField({ ...props.person.location, value: props.person.location }),
      imgUrl: Form.createFormField({ ...props.person.imgUrl, value: props.person.imgUrl }),
      status: Form.createFormField({ ...props.person.status, value: props.person.status }),
    };
  },
  onValuesChange(_, values) {
    console.log('onValuesChange', values);
  },
})(PersonDetailForm);

