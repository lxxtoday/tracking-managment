import React from 'react'
import { Form, Card, Input, Button, Radio, message } from 'antd'
import { RedoOutlined } from '@ant-design/icons'
import * as API from '@/constants/api'

import axios from '@/utils/axios'

import Content from '@/layout/content'

const { TextArea } = Input

export default function CreateTrack() {
  const [form] = Form.useForm()

  const handleReset = () => {
    form.resetFields()
  }

  const onFinash = values => {
    axios.post(API.attribute, values).then(() => {
      message.success('创建成功')
      handleReset()
    })
  }

  return (
    <Content
      crumbData={[
        { label: '/management/attribute/show', value: '属性列表' },
        { value: '新增属性' },
      ]}
    >
      <Card title="属性相关信息" className="wrapper-attribute-create">
        <Form
          form={form}
          onFinish={onFinash}
          labelCol={{ span: 6 }}
          initialValues={{ type: 'string' }}
        >
          <Form.Item
            label="属性名称"
            name="name"
            rules={[
              {
                required: true,
                whitespace: true,
                pattern: /^\w{1,20}$/,
                message: '仅支持字母，数字，下划线且长度不大于20',
              },
            ]}
          >
            <Input allowClear placeholder="请输入属性名称" />
          </Form.Item>
          <Form.Item
            label="属性描述"
            name="describe"
            rules={[
              {
                max: 100,
                required: true,
                whitespace: true,
                message: '属性描述格式有误',
              },
            ]}
          >
            <TextArea
              allowClear
              className="textarea"
              autoSize={{ minRows: 4 }}
              placeholder="请输入事件描述"
            />
          </Form.Item>
          <Form.Item required label="属性类型" name="type">
            <Radio.Group buttonStyle="solid">
              <Radio.Button value="string">string</Radio.Button>
              <Radio.Button value="number">number</Radio.Button>
              <Radio.Button value="boolean">boolean</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="创建者"
            name="creator"
            rules={[
              {
                max: 20,
                required: true,
                whitespace: true,
                message: '输入格式有误',
              },
            ]}
          >
            <Input allowClear placeholder="请输入属性创建者" />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6 }}>
            <Button onClick={handleReset}>
              <RedoOutlined />
              重置
            </Button>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 15 }}>
              提交
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <style jsx>{`
        :global(.wrapper-attribute-create .ant-input-affix-wrapper) {
          width: 400px;
        }
      `}</style>
    </Content>
  )
}
