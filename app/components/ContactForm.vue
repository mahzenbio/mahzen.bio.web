<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '@nuxt/ui'
import type { ContactFormState } from '~/types/site'

const {
  subjectLabel,
  subjectPlaceholder,
  messageLabel,
  messagePlaceholder,
  submitLabel,
  successMessage,
  errorMessage,
} = defineProps<{
  subjectLabel: string
  subjectPlaceholder: string
  messageLabel: string
  messagePlaceholder: string
  submitLabel: string
  successMessage: string
  errorMessage: string
}>()

const state = reactive<ContactFormState>({
  subject: '',
  message: '',
})

const toast = useToast()
const pending = ref(false)

function validate(state: ContactFormState): FormError[] {
  const errors: FormError[] = []

  if (state.subject.trim().length < 3) {
    errors.push({
      name: 'subject',
      message: 'Lütfen en az 3 karakterlik bir konu yazın.',
    })
  }

  if (state.message.trim().length < 10) {
    errors.push({
      name: 'message',
      message: 'Lütfen en az 10 karakter yazın.',
    })
  }

  return errors
}

function getErrorMessage(error: unknown) {
  const data = (error as {
    data?: {
      statusMessage?: string
      data?: { errors?: string[] }
    }
  })?.data

  return data?.data?.errors?.[0]
    ?? data?.statusMessage
    ?? errorMessage
}

async function onSubmit(event: FormSubmitEvent<ContactFormState>) {
  pending.value = true

  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: event.data,
    })

    toast.add({
      title: 'Mesaj gönderildi',
      description: successMessage,
      icon: 'i-lucide-check',
      color: 'success',
    })

    Object.assign(state, {
      subject: '',
      message: '',
    })
  }
  catch (error) {
    toast.add({
      title: 'Mesaj gönderilemedi',
      description: getErrorMessage(error),
      icon: 'i-lucide-triangle-alert',
      color: 'error',
    })
  }
  finally {
    pending.value = false
  }
}
</script>

<template>
  <UForm
    :state="state"
    :validate="validate"
    class="max-w-xl space-y-4"
    @submit="onSubmit"
  >
    <UFormField
      :label="subjectLabel"
      name="subject"
      required
    >
      <UInput
        v-model="state.subject"
        :placeholder="subjectPlaceholder"
        maxlength="150"
        class="w-full"
      />
    </UFormField>

    <UFormField
      :label="messageLabel"
      name="message"
      required
    >
      <UTextarea
        v-model="state.message"
        :placeholder="messagePlaceholder"
        :rows="8"
        maxlength="2000"
        class="w-full"
      />
    </UFormField>

    <UButton
      type="submit"
      :label="submitLabel"
      :loading="pending"
      color="primary"
      size="lg"
      trailing-icon="i-lucide-send"
    />
  </UForm>
</template>
