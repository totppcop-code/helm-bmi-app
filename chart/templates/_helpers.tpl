{{/* 通用 fullname */}}
{{- define "component.fullname" -}}
{{ printf "%s-%s" .Release.Name .Values.name }}
{{- end -}}

{{/* 通用 labels */}}
{{- define "component.labels" -}}
app.kubernetes.io/name: {{ .Values.name }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end -}}

{{/* 通用 selectorLabels */}}
{{- define "component.selectorLabels" -}}
app.kubernetes.io/name: {{ .Values.name }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end -}}