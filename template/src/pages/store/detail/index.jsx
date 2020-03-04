import React from 'react';
import { Button, message } from 'antd';
import ImgUpload from '../../../components/img-upload';
import InputCell from '../../../components/input-cell';
import CascaderCell from '../../../components/cascader-cell';
import SelectCell from '../../../components/select-cell';
import styles from './index.module.less';
import { getRegions, getPlace, save } from './api';

class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {},
      regionOptions: [],
      placeOptions: [],
    };
  }

  async componentDidMount() {
    const res = await getRegions();
    if (res.code === 0) {
      this.setState({
        regionOptions: res.data,
      });
    }
  }

  createFormItems() {
    const { regionOptions, placeOptions } = this.state;
    return [
      {
        title: '门店名称',
        type: 'input',
        dataIndex: 'storeName',
        required: true,
      },
      {
        title: '门店负责人',
        type: 'input',
        dataIndex: 'storeOwner',
        required: true,
      },
      {
        title: '联系电话',
        type: 'input',
        inputType: 'int',
        digits: 11,
        dataIndex: 'phone',
        required: true,
      },
      {
        title: '省市区',
        type: 'cascader',
        dataIndex: 'region',
        required: true,
        options: regionOptions,
        fieldNames: {
          label: 'name',
          value: '_id',
          children: 'districts',
        },
      },
      {
        title: '门店地址',
        type: 'select',
        dataIndex: 'address',
        required: true,
        options: placeOptions,
        showSearch: true,
        labelInValue: true,
        optionLabelProp: 'address',
        renderOption: (option) => (
          <div>
            <div>{option.name}</div>
            <div>{option.address}</div>
          </div>
        ),
        onSearch: (value) => {
          if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
          }
          this.currentValue = value;
          const fake = async () => {
            if (this.currentValue === value) {
              const res = await getPlace({ searchKey: value });
              if (res.code === 0) {
                this.setState({
                  placeOptions: res.data,
                });
              }
            }
          };
          this.timeout = setTimeout(fake, 300);
        },
      },
      {
        title: '门店照片',
        type: 'imgUpload',
        dataIndex: 'storePhotos',
      },
    ];
  }

  renderItems(formItem) {
    const { form } = this.state;
    let formItemView = '';
    switch (formItem.type) {
      case 'input':
        formItemView = (
          <InputCell
            className={styles.row}
            key={formItem.dataIndex}
            title={formItem.title}
            type={formItem.inputType}
            required={formItem.required}
            digits={formItem.digits}
            value={form[formItem.dataIndex]}
            onChange={(value) => this.setState({
              form: { ...form, [formItem.dataIndex]: value },
            })}
          />
        );
        break;
      case 'cascader':
        formItemView = (
          <CascaderCell
            className={styles.row}
            title={formItem.title}
            required={formItem.required}
            value={form[formItem.dataIndex]}
            key={formItem.dataIndex}
            options={formItem.options}
            fieldNames={formItem.fieldNames}
            onChange={(value) => this.setState({
              form: { ...form, [formItem.dataIndex]: value },
            })}
          />
        );
        break;
      case 'imgUpload':
        formItemView = (
          <div
            className={styles.row}
            key={formItem.dataIndex}
          >
            <div className={styles.left}>{formItem.title}：</div>
            <ImgUpload
              className={styles.right}
              maxLength={5}
              onChange={(fileObjs) => {
                this.setState({
                  form: { ...form, [formItem.dataIndex]: fileObjs.map((obj) => obj.compressFile) },
                });
              }}
            />
          </div>
        );
        break;
      case 'select':
        formItemView = (
          <SelectCell
            className={styles.row}
            key={formItem.dataIndex}
            title={formItem.title}
            showSearch={formItem.showSearch}
            required={formItem.required}
            value={form[formItem.dataIndex]}
            optionLabelProp={formItem.optionLabelProp}
            onSearch={(value) => formItem.onSearch(value)}
            labelInValue={formItem.labelInValue}
            onChange={(value) => {
              this.setState({
                form: { ...form, [formItem.dataIndex]: value },
              });
            }}
            options={formItem.options}
            renderOption={formItem.renderOption}
          />
        );
        break;
      default:
        formItemView = '';
    }

    return formItemView;
  }

  render() {
    const { form } = this.state;
    const { history } = this.props;
    const formItems = this.createFormItems();
    return (
      <div className={styles.container}>
        {
            formItems.map((formItem) => this.renderItems(formItem))
          }
        <div
          className={styles.row}
        >
          <Button
            type="primary"
            onClick={async () => {
              let invalid = false;
              formItems.forEach((formItem) => {
                if (formItem.required && !form[formItem.dataIndex]) {
                  invalid = true;
                }
              });
              if (invalid) {
                message.warn('请完善信息');
                return;
              }
              const result = await save({
                storeName: form.storeName,
                userName: form.storeOwner,
                phone: form.phone,
                region: JSON.stringify(form.region),
                address: form.address.label,
                longLat: form.address.key,
                storePhotos: form.storePhotos,
              });
              if (!result.code) {
                message.success('保存成功!', 3, () => {
                  history.goBack();
                });
              }
            }}
          >
            保存
          </Button>
        </div>
      </div>
    );
  }
}

export default Detail;
