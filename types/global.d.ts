import type { Component } from 'vue'
import type { ButtonType } from 'element-plus'

declare global {
  interface OperationButton {
    label: string
    type?: ButtonType
    icon?: Component
    onClick: () => void
  }

  interface OperationForm {
    type: 'input' | 'select' | 'date' | 'daterange'
    label?: string
    prop: string
    placeholder?: string
    options?: { label: string; value: any }[] // 仅用于select类型
    dateType?: 'date' | 'datetime' | 'month' | 'year' // 仅用于date类型
  }

  interface TableButton {
    label: string
    type?: ButtonType
    icon?: Component
    show?: (row: any) => boolean
    onClick: (row: any, index?: number) => void
  }

  interface TableColumn {
    type?: 'selection' | 'operation' | 'tag' | 'switch' | 'image'
    prop: string
    label: string
    width?: number
    minWidth?: number
    sortable?: boolean
    align?: 'left' | 'center' | 'right'
    slot?: string
    formatter?: (any) => {}
  }
}

export {}
