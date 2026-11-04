#!/usr/bin/env bash
# One-time setup for the voice: a Python venv with kokoro-onnx (open-weights
# TTS, Apache-2.0) and the timestamped Kokoro model + voices (~120 MB).
# Everything lands in reels/affirm/.voice/, which git ignores.
set -euo pipefail
cd "$(dirname "$0")"
mkdir -p .voice
[ -x .voice/venv/bin/python ] || python3 -m venv .voice/venv
.voice/venv/bin/pip install -q --upgrade kokoro-onnx soundfile numpy
[ -s .voice/kokoro-timestamped.onnx ] || curl -fL -o .voice/kokoro-timestamped.onnx \
  https://huggingface.co/onnx-community/Kokoro-82M-v1.0-ONNX-timestamped/resolve/main/onnx/model_quantized.onnx
[ -s .voice/voices-v1.0.bin ] || curl -fL -o .voice/voices-v1.0.bin \
  https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/voices-v1.0.bin
echo "voice ready: $(pwd)/.voice"
